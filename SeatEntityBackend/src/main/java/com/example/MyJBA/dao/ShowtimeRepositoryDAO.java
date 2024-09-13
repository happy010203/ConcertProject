package com.example.MyJBA.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

import com.example.MyJBA.entity.Cinema;
import com.example.MyJBA.entity.Showdates;
import com.example.MyJBA.entity.Showtimes;

public interface ShowtimeRepositoryDAO extends JpaRepository<Showtimes, Integer> {

    // 查找特定影院的所有唯一放映日期
    List<Showtimes> findDistinctBycinema(Cinema cinema);

    // 查找特定影院和日期的所有放映时间
    List<Showtimes> findByCinemaAndShowDate(Cinema cinema, Showdates showDateId);
}

