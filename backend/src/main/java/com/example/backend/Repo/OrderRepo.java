package com.example.backend.Repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.Entity.Order;

public interface OrderRepo extends JpaRepository<Order, Integer> {
    Optional<Order> findByOrderNumber(Integer orderNumber);
    
    List<Order> findByUserId(Integer userId);
}
