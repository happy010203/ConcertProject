package com.example.backend.Security;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.example.backend.Exception.InvalidTokenException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    
    private static final String SECRET_KEY = 
        "T8qJvKSoH/kU7vDWIQ/YFqkti03oRdSN4X+2vSF/b1D9JLfMqx5EiUNrOnNV5hZm";

    
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    
    public String generateToken(String email) {
        return generateToken(Map.of(), email, 1000 * 60 * 60); // 默認有效期為 1 小時
    }
    
    public String generateToken(String email, List<String> roles) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", roles); // 將角色添加到 Claims 中
        return generateToken(claims, email, 1000 * 60 * 60 * 24); // Token 有效期設為 24 小時
    }


    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", userDetails.getAuthorities().stream()
                                   .map(GrantedAuthority::getAuthority)
                                   .collect(Collectors.toList()));
        return generateToken(claims, userDetails.getUsername(), 1000 * 60 * 60 * 24); // 默認有效期為 24 小時
    }

    // 生成 JWT，並設定一些默認的 Claims
    private String generateToken(Map<String, Object> claims, String subject, long expirationMillis) {
        return Jwts.builder()
                .setClaims(claims) // 設置自訂的 Claims
                .setSubject(subject) // 設置 Subject 為用戶名
                .setIssuedAt(new Date(System.currentTimeMillis())) // 設置簽發時間
                .setExpiration(new Date(System.currentTimeMillis() + expirationMillis)) // 設置到期時間
                .signWith(getSignInKey(), SignatureAlgorithm.HS256) // 使用固定的密鑰和 HMAC SHA-256 簽名演算法對 JWT 進行簽名
                .compact();
    }

    
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    
    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    
    public boolean isTokenValid(String token, UserDetails userDetails, List<String> requiredRoles) {
        final String username = extractUsername(token);
        boolean isValidUser = username.equals(userDetails.getUsername()) && !isTokenExpired(token);

        if (isValidUser) {
            List<String> roles = extractRoles(token);
            return requiredRoles.stream().allMatch(roles::contains);
        }

        return false;
    }

    // 檢查 JWT 是否已過期
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // 提取 JWT 的到期時間
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // 從 JWT 提取角色
    private List<String> extractRoles(String token) {
        return extractClaim(token, claims -> {
            Object rolesClaim = claims.get("roles");
            if (rolesClaim instanceof List) {
                @SuppressWarnings("unchecked")
                List<String> roles = (List<String>) rolesClaim;
                return roles;
            }
            return List.of(); // 返回空列表以防錯誤的類型
        });
    }

    
    private Claims extractAllClaims(String token) {
        try {
            return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        } catch (JwtException | IllegalArgumentException e) {
            throw new InvalidTokenException("Invalid JWT token");
        }
    }
}

