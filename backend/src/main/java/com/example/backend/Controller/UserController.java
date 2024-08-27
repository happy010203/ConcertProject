package com.example.backend.Controller;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity; 
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.DTO.UserDTO;
import com.example.backend.Entity.User;
import com.example.backend.Service.UserService;

@RestController
@RequestMapping("/signup")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/getusers")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> saveUser(@RequestBody UserDTO user) {
        int savedUser = userService.saveOrUpdateUser(user);

        // 返回 JSON 格式的响应
        Map<String, String> response = new HashMap<>();
        response.put("message", "User saved with ID: " + savedUser);
        return ResponseEntity.status(201).body(response);
    }
}

