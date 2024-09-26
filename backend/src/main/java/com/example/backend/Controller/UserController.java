package com.example.backend.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {
	
	
		
		@GetMapping("/say-hello")
		public ResponseEntity<String> sayHello(){
			return ResponseEntity.ok("Hello Secured endpoint");
		}
	
}

