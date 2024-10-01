package com.example.backend.Security;


import java.util.Arrays;
import java.util.Collections;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import com.fasterxml.jackson.databind.ObjectMapper;

@Configuration
public class SecurityConfiguration {


	private final AuthenticationProvider authenticationProvider;
	private final JwtAuthenticationFilter jwtAuthFilter;

	@Autowired
	CustomOAuth2UserService customOAuth2UserService;

	@Autowired
	JwtService jwtService;

	@Autowired
	public SecurityConfiguration(AuthenticationProvider authenticationProvider, JwtAuthenticationFilter jwtAuthFilter) {
		this.authenticationProvider = authenticationProvider;
		this.jwtAuthFilter = jwtAuthFilter;
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.cors(cors -> cors.configurationSource(request -> {
			CorsConfiguration corsConfig = new CorsConfiguration();
			corsConfig.setAllowedOriginPatterns(Collections.singletonList("*"));
			corsConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
			corsConfig.setAllowedHeaders(List.of("*"));
			corsConfig.setAllowCredentials(false);
			return corsConfig;
		}))
		.csrf(csrf -> csrf.disable())
				.authorizeHttpRequests(authz -> authz.requestMatchers("/api/movie/**").permitAll()
						.requestMatchers("/img/**", "/news/**", "/ecpay/**").permitAll().requestMatchers("/api/orders/**")
						.permitAll().requestMatchers("/api/manager/**").hasRole("MANAGER")
						.requestMatchers("/api/admin/**").hasAnyRole("ADMIN", "MANAGER").requestMatchers("/api/user/**")
						.hasRole("USER").anyRequest().authenticated())
				.oauth2Login(oauth2Login -> oauth2Login
						.userInfoEndpoint(userInfo -> userInfo.userService(customOAuth2UserService) // 使用自定義的
																									// OAuth2UserService
						).successHandler((request, response, authentication) -> {
							// 從 OAuth2User 提取 email 和 name
							OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
							String email = oAuth2User.getAttribute("email");
							String name = oAuth2User.getAttribute("name");

							// 提取角色信息
							List<String> roles = oAuth2User.getAuthorities().stream()
									.map(GrantedAuthority::getAuthority).map(role -> role.replace("ROLE_", ""))
									.collect(Collectors.toList());

							// 生成 JWT token，包含 email 和角色信息
							String token = jwtService.generateToken(email, roles);

							// 返回 token、roles 和 name 作為 JSON 響應
							response.setContentType("application/json");
							response.getWriter().write("{\"token\": \"" + token + "\", \"roles\": "
									+ new ObjectMapper().writeValueAsString(roles) + ", \"name\": \"" + name + "\"}");
						}))
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authenticationProvider(authenticationProvider)
				.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)

				// 添加 Content Security Policy (CSP)
				.headers(headers -> headers.contentSecurityPolicy(csp -> csp.policyDirectives(
						"default-src 'self'; " + "script-src 'self' https://kevin-0514.github.io 'unsafe-inline'; "
								+ "style-src 'self' 'unsafe-inline'; "
								+ "img-src 'self' data: https://payment-stage.ecPay.com.tw; "
								+ "connect-src 'self' https://kevin-0514.github.io; "
								+ "frame-src https://payment-stage.ecPay.com.tw; "
								+ "form-action 'self' https://payment-stage.ecPay.com.tw; " + "base-uri 'self';")));

		return http.build();
	}
}

