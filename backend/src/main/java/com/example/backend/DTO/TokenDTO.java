package com.example.backend.DTO;

import java.util.List;

public class TokenDTO {
    
    private String token;
    private List<String> roles;
    private String name;

    public TokenDTO(String token, List<String> roles, String name) {
        this.token = token;
        this.roles = roles;
        this.name = name;
    }

    // Getters and Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

