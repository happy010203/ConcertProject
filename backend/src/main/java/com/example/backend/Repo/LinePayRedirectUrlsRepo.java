package com.example.backend.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.Entity.LinePayRedirectUrls;


@Repository
public interface LinePayRedirectUrlsRepo extends JpaRepository<LinePayRedirectUrls, Integer> {
    

}