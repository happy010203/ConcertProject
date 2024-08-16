package com.example.backend.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.Entity.Seat;

public interface SeatRepo extends JpaRepository<Seat, Long> {
}
