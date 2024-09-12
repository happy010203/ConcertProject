package com.example.backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.backend.DTO.LoginDTO;
import com.example.backend.DTO.TokenDTO;
import com.example.backend.Entity.User;
import com.example.backend.Repo.UserRepo;
import com.example.backend.Security.CustomUserDetails;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepo userRepo;
    
    @Autowired
    @Lazy
    private UserService userService;

    @Autowired
    public CustomUserDetailsService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }
    
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepo.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User with email " + email + " not found"));
        return new CustomUserDetails(user);
    }
    
    public TokenDTO authenticate(LoginDTO loginDTO) {
        return userService.login(loginDTO);
    }
}

