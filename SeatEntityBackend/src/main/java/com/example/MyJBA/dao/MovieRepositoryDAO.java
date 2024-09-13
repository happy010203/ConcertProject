package com.example.MyJBA.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.MyJBA.entity.Movie;

public interface MovieRepositoryDAO extends JpaRepository<Movie, Integer> {
}
