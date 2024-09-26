package com.example.backend.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.Entity.News;

public interface NewsRepo extends JpaRepository<News, Integer>{
	
}
