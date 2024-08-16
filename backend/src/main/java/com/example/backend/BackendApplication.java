package com.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
	
	// WebMvcConfigurer 是一个接口，允许你自定义 Spring MVC 的配置
	// 配置与 Web MVC 相关的设置，比如 CORS、拦截器、视图解析器
	@Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // 定义了哪些 URL 模式需要应用 CORS 配置
                        .allowedOrigins("http://localhost:3000") // 允许的前端地址
                        .allowedMethods("*"); // 允许的 HTTP 方法
            }
        };
    }

}
