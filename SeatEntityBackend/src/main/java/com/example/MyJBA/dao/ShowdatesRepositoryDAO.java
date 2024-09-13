package com.example.MyJBA.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.MyJBA.entity.Showdates;

@Repository
public interface ShowdatesRepositoryDAO extends JpaRepository<Showdates, Long> {
    
}
