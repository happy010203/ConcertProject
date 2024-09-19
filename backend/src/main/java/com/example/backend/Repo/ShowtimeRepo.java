package com.example.backend.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.Entity.Cinema;
import com.example.backend.Entity.Showdate;
import com.example.backend.Entity.Showtime;

public interface ShowtimeRepo extends JpaRepository<Showtime, Integer> {

    // 查找特定影院的所有唯一放映日期
    List<Showtime> findDistinctBycinema(Cinema cinema);

    // 查找特定影院和日期的所有放映时间
    List<Showtime> findByCinemaAndShowDate(Cinema cinema, Showdate showDateId);
}
