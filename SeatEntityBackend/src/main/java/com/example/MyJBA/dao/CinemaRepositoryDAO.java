package com.example.MyJBA.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.MyJBA.entity.Cinema;

public interface CinemaRepositoryDAO extends JpaRepository<Cinema, Integer> {
}
