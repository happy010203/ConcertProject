package com.example.MyJBA.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.MyJBA.entity.Seat;
import com.example.MyJBA.entity.SeatEntity;


@Repository
public interface SeatRepositoryDAO extends JpaRepository<Seat, Long> {

    //未完成
    @Query(
            nativeQuery = true,
            //"""代表多行字串
            value = """
            	SELECT *
                FROM seats
                where fk_showtime_id = ?1
            """
    )
    List<Seat> findByFkshowtimeId(int fkshowtimeId);

    void save(SeatEntity seatEntity);
}
