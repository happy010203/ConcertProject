package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class Project1Application {

	public static void main(String[] args) {
		SpringApplication.run(Project1Application.class, args);
	}

	@Configuration
	public class WebConfig implements WebMvcConfigurer {

	    @Override
	    public void addCorsMappings(CorsRegistry registry) {
	        registry.addMapping("/**")
	                .allowedOrigins("http://localhost:3000")  // 允許的前端 URL
	                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
	                .allowedHeaders("*")
	                .allowCredentials(true);
	    }
    }
}
