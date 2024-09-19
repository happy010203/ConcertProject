package com.example.backend.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.Entity.Showdate;

public interface ShowdateRepo extends JpaRepository<Showdate, Integer> {
    
}
