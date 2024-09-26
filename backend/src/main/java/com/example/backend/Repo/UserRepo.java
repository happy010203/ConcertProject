package com.example.backend.Repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.backend.Entity.User;


public interface UserRepo extends JpaRepository <User, Integer> {
	
	Optional<User> findByEmail(String email);
	
	boolean existsByUsernameOrEmail(String username, String email);
	
	@Query("SELECT u FROM User u WHERE u.username LIKE %:username%")
	Optional<User> findByUsername(String username);
}
