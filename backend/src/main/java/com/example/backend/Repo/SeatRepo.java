package com.example.backend.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.backend.Entity.Cinema;
import com.example.backend.Entity.Hall;
import com.example.backend.Entity.Seat;
import com.example.backend.Entity.Showtime;

public interface SeatRepo extends JpaRepository<Seat, Long> {
    
    // 查找特定座位
    Seat findByShowtimeIdAndCinemaIdAndHallIdAndSeatNumber(Showtime showtimeId, Cinema cinemaId, Hall hallId, String seatNumber);

    // 使用命名規則定義自動查詢
    @Query("SELECT s FROM Seat s WHERE s.showtimeId.cinema.cinema_id = :cinemaId AND s.showtimeId.hall.hall_id = :hallId AND s.showtimeId.showDate.show_date = :showDate")
    List<Seat> findSeatsByCinemaIdAndHallIdAndShowDate(@Param("cinemaId") Integer cinemaId, @Param("hallId") Integer hallId, @Param("showDate") String showDate);

    @Query("SELECT s FROM Seat s WHERE s.showtimeId.showtime_id = :showtimeId AND s.cinemaId.cinema_id = :cinemaId AND s.hallId.hall_id = :hallId AND s.showtimeId.showDate.show_date = :showDate")
    List<Seat> findByShowtimeCinemaHallAndDate(
        @Param("showtimeId") Integer showtimeId,
        @Param("cinemaId") Integer cinemaId,
        @Param("hallId") Integer hallId,
        @Param("showDate") String showDate);



}
