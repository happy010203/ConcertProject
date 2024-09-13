package com.example.MyJBA.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.MyJBA.dao.ShowtimeRepositoryDAO;
import com.example.MyJBA.entity.Showtimes;

@Service
public class ShowtimeService {
	
	//從 ShowtimeRepositoryDAO 取得 ShowtimeById
	 @Autowired
	 private ShowtimeRepositoryDAO showtimeRepositoryDao;

	 public Showtimes getShowtimeById(Integer showtimeId) {
        return showtimeRepositoryDao.findById(showtimeId).orElse(null);
	 }
	
}
