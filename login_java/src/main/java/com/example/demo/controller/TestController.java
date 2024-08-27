package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.Entity.UserRegistration;
import com.example.demo.service.TestService;

@Controller
@RequestMapping("/demo")
public class TestController {
	@Autowired
	 private TestService demoService;
	@GetMapping("/index")
   public String test1(Model model) {
		List<UserRegistration> userData=demoService.getAllUsers();
		
    model.addAttribute("proList", userData.get(0).getUsername());
    
    return "signup/signup";
    
   }

}