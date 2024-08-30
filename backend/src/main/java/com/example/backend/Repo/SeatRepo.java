package com.example.backend.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.backend.Entity.Seat;

import jakarta.transaction.Transactional;

@Repository
public interface SeatRepo extends JpaRepository<Seat, Long> {

    //查詢區域的已預訂座位 (SeatNumber-用區域前綴查詢、SeatAvailability
    List<Seat> findBySeatNumberStartingWithAndSeatAvailability(String sectionPrefix, boolean seatAvailability);

    List<Seat> findBySeatNumber(String seatNumber);

    //更新seat_number
    @Transactional
    @Modifying
    @Query(
        nativeQuery = true,
        value = """
                UPDATE seats SET seat_number = ?1 WHERE seat_id = ?2
                """
    )
    int updateSeatNumber(String seat_number, Long seatid);
}
