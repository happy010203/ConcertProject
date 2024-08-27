package com.example.backend.Service;

import java.util.List;
import java.util.Optional;

import com.example.backend.DTO.UserDTO;
import com.example.backend.Entity.User;

public interface UserService {
    
    List<User> getAllUsers();
    
    Optional<User> getUserById(Integer id);
    
    int saveOrUpdateUser(UserDTO user);
    
    void deleteUserById(Integer id);
    
    Optional<User> updateUser(Integer id, User updatedUser);
}

