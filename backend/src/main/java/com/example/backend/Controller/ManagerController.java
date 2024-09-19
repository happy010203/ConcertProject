package com.example.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.backend.Entity.User;
import com.example.backend.Service.UserService;

@RequestMapping("api/manager")
public class ManagerController {
	
	@Autowired
	private UserService userService;
	
	@PutMapping("/{id}/role")
    public User updateUserRole(@PathVariable Integer id, @RequestParam String role) {
        return userService.updateUserRole(id, role);
    }
}
