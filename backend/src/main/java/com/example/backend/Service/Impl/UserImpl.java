package com.example.backend.Service.Impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.DTO.UserDTO;
import com.example.backend.Entity.Gender;
import com.example.backend.Entity.Role;
import com.example.backend.Entity.User;
import com.example.backend.Repo.UserRepo;
import com.example.backend.Service.UserService;

import jakarta.transaction.Transactional;

@Service
public class UserImpl implements UserService {

    @Autowired
    private UserRepo userRepo;
    
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @Override
    public Optional<User> getUserById(Integer id) {
        return userRepo.findById(id);
    }

    @Override
    @Transactional
    public int saveOrUpdateUser(UserDTO user) {
        User entity = new User();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-DD"); 
        try {
            System.out.println("Received Birthdate: " + user.getbirthDate());
            Date date = (Date)formatter.parse(user.getbirthDate());
            entity.setBirthDate(date);
            
        } catch (ParseException e) {
            e.printStackTrace();
        }
        BeanUtils.copyProperties(user, entity);
        
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        entity.setPassword(encodedPassword);

        if(Gender.Male.toString().equals(user.getGender())){
            entity.setGender(Gender.Male);
        } else if(Gender.Female.toString().equals(user.getGender())) {
            entity.setGender(Gender.Female);
        } else if(Gender.Other.toString().equals(user.getGender())) {
            entity.setGender(Gender.Other);
        }
        entity.setRole(Role.USER);
        entity = userRepo.save(entity);
        return entity.getUser_id();
    }

    @Override
    public void deleteUserById(Integer id) {
        userRepo.deleteById(id);
    }

    @Override
    public Optional<User> updateUser(Integer id, User updatedUser) {
        return userRepo.findById(id).map(user -> {
            user.setUsername(updatedUser.getUsername());
            user.setEmail(updatedUser.getEmail());
            user.setPassword(updatedUser.getPassword());
            user.setGender(updatedUser.getGender());
            user.setRole(Role.USER);
            user.setBirthDate(updatedUser.getBirthDate());
            return userRepo.save(user);
        });
    }
}

