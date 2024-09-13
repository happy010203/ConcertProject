package com.example.MyJBA.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.MyJBA.entity.Halls;

public interface HallsRepositoryDAO extends JpaRepository<Halls, Integer> {
    
}

