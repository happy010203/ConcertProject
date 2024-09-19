package com.example.backend.Service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.Entity.Showtime;
import com.example.backend.Repo.ShowtimeRepo;
import com.example.backend.Service.ShowtimeService;

@Service
public class ShowtimeServiceImpl implements ShowtimeService{
	
	//從 ShowtimeRepositoryDAO 取得 ShowtimeById
	 @Autowired
	 private ShowtimeRepo showtimeRepo;

	 public Showtime getShowtimeById(Integer showtimeId) {
        return showtimeRepo.findById(showtimeId).orElse(null);
	 }
	
}
