package com.example.backend.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.Entity.Ticket;

public interface TicketRepo extends JpaRepository<Ticket, Long> {
}
