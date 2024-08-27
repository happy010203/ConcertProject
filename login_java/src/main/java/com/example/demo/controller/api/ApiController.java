package com.example.demo.controller.api;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.UserRegistration;
import com.example.demo.service.TestService;
import com.example.demo.vo.UserRegistrationVO;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;

@RestController
@RequestMapping("/signupapi")
@CrossOrigin(origins = "http://localhost:3000")
public class ApiController {

    private final TestService userService;
    

    
   
    @Autowired
    public ApiController(TestService userService) {
        this.userService = userService;
    }

    @GetMapping("/getusers")
    public ResponseEntity<List<UserRegistration>> getAllUsers() {
        List<UserRegistration> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/postusers")
    public ResponseEntity<Map<String, String>> saveUser(@RequestBody UserRegistrationVO user) {
        int savedUser = userService.saveOrUpdateUser(user);

        // 返回JSON格式的響應
        Map<String, String> response = new HashMap<>();
        response.put("message", "User saved with ID: " + savedUser);
        return ResponseEntity.status(201).body(response);
    }
}
