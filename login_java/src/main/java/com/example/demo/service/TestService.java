package com.example.demo.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.Entity.UserRegistration;
import com.example.demo.Entity.UserRegistration.Gender;
import com.example.demo.Entity.UserRegistration.Role;
import com.example.demo.repository.UserRegistrationRepository;
import com.example.demo.vo.UserRegistrationVO;

@Service
public class TestService {

    @Autowired
    private UserRegistrationRepository userRegistrationRepository;

    
    public List<UserRegistration> getAllUsers() {
        return userRegistrationRepository.findAll();
    }

    
    public Optional<UserRegistration> getUserById(Integer id) {
        return userRegistrationRepository.findById(id);
    }

    
    @Transactional
    public int saveOrUpdateUser(UserRegistrationVO user) {
    	UserRegistration enity = new UserRegistration();
    	SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-DD"); 
    	try {
    		System.out.println("Received Birthdate: " + user.getbirthDate());
			Date date = (Date)formatter.parse(user.getbirthDate());
			enity.setBirthDate(date);
			
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			
		}
    		BeanUtils.copyProperties(user, enity);
    		
    		if(Gender.Male.toString().equals(user.getGender())){
    			enity.setGender(Gender.Male);
    		}
    		else if(Gender.Female.toString().equals(user.getGender())) {
    			enity.setGender(Gender.Female);
    		}
    		else if(Gender.Other.toString().equals(user.getGender())) {
    			enity.setGender(Gender.Other);
    		}
    	enity=userRegistrationRepository.save(enity);
    	return enity.getUser_id();
    }

  
    public void deleteUserById(Integer id) {
        userRegistrationRepository.deleteById(id);
    }

   
    public Optional<UserRegistration> updateUser(Integer id, UserRegistration updatedUser) {
        return userRegistrationRepository.findById(id).map(user -> {
            user.setUsername(updatedUser.getUsername());
            user.setEmail(updatedUser.getEmail());
            user.setPassword(updatedUser.getPassword());
            user.setGender(updatedUser.getGender());
            user.setRole(Role.USER);
            user.setBirthDate((updatedUser.getBirthDate()));
            return userRegistrationRepository.save(user);
        });
    } 
}
