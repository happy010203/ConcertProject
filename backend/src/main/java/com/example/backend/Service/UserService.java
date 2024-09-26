package com.example.backend.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.backend.DTO.LoginDTO;
import com.example.backend.DTO.TokenDTO;
import com.example.backend.DTO.UserDTO;
import com.example.backend.Entity.User;

public interface UserService {
    
    List<User> getAllUsers();
    
    int saveOrUpdateUser(UserDTO user) throws Exception; // register
    
    Optional<User> updateUser(Integer id, User updatedUser);
    
    TokenDTO login(LoginDTO user);
    
    User updateUserRole(@PathVariable Integer id, @RequestParam String role);
    
    Optional<User> findByUsername(String username);
}

