package com.example.backend.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.Entity.Cinema;

public interface CinemaRepo extends JpaRepository<Cinema, Integer> {
}
