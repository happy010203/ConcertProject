package com.example.MyJBA.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.MyJBA.entity.Cinema;
import com.example.MyJBA.entity.Halls;
import com.example.MyJBA.entity.SeatEntity;
import com.example.MyJBA.entity.Showtimes;

@Repository
public interface SeatRepositoryEntityDAO extends JpaRepository<SeatEntity, Long> {
    
    // 查找特定座位
    SeatEntity findByShowtimeIdAndCinemaIdAndHallIdAndSeatNumber(Showtimes showtimeId, Cinema cinemaId, Halls hallId, String seatNumber);

    // 使用命名規則定義自動查詢
    @Query("SELECT s FROM SeatEntity s WHERE s.showtimeId.cinema.cinema_id = :cinemaId AND s.showtimeId.hall.hall_id = :hallId AND s.showtimeId.showDate.show_date = :showDate")
    List<SeatEntity> findSeatsByCinemaIdAndHallIdAndShowDate(@Param("cinemaId") Integer cinemaId, @Param("hallId") Integer hallId, @Param("showDate") String showDate);

    @Query("SELECT s FROM SeatEntity s WHERE s.showtimeId.showtime_id = :showtimeId " +
       "AND s.cinemaId.cinema_id = :cinemaId " +
       "AND s.hallId.hall_id = :hallId " +
       "AND s.showtimeId.showDate.show_date = :showDate")
    List<SeatEntity> findByShowtimeCinemaHallAndDate(
        @Param("showtimeId") Integer showtimeId,
        @Param("cinemaId") Integer cinemaId,
        @Param("hallId") Integer hallId,
        @Param("showDate") String showDate);



}