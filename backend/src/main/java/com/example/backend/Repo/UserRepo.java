package com.example.backend.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.Entity.User;


public interface UserRepo extends JpaRepository <User, Integer> {
	
}
