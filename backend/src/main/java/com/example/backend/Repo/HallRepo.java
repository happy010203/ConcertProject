package com.example.backend.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.Entity.Hall;

public interface HallRepo extends JpaRepository<Hall, Integer> {
    
}
