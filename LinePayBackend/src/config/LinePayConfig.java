package com.example.MyJBA.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.web.client.RestTemplate;

@Configuration
public class LinePayConfig {
    
    @Bean
    @Primary
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

}
