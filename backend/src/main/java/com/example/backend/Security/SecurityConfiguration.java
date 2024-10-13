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
			corsConfig.setAllowCredentials(true);
			return corsConfig;
		}))
				.csrf(csrf -> csrf.disable())
				.authorizeHttpRequests(authz -> authz.requestMatchers("/api/movie/**").permitAll()
						.requestMatchers("/img/**", "/news/**", "/ecpay/**", "/checkout/**").permitAll()
						.requestMatchers("/api/orders/**")
						.permitAll().requestMatchers("/api/manager/**").hasRole("MANAGER")
						.requestMatchers("/api/admin/**").hasAnyRole("ADMIN", "MANAGER").requestMatchers("/api/user/**")
						.hasRole("USER").anyRequest().authenticated())
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authenticationProvider(authenticationProvider)
				.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)

				// 添加 Content Security Policy (CSP)
				.headers(headers -> headers.contentSecurityPolicy(csp -> csp.policyDirectives(
					"default-src 'self'; " +
					"script-src 'self' https://kevin-0514.github.io 'unsafe-inline'; " +
					"style-src 'self' 'unsafe-inline'; " +
					"img-src 'self' data: https://payment-stage.ecPay.com.tw; " +
					"connect-src 'self' https://sandbox-api-pay.line.me https://payment-stage.ecPay.com.tw; " + 
					"frame-src https://payment-stage.ecPay.com.tw; " +
					"form-action 'self' https://payment-stage.ecPay.com.tw; " +
					"base-uri 'self';")));

		return http.build();
	}
}
