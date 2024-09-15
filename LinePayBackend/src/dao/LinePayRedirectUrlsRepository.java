package com.example.MyJBA.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.MyJBA.entity.LinePayRedirectUrls;



@Repository
public interface LinePayRedirectUrlsRepository extends JpaRepository<LinePayRedirectUrls, Integer> {
    

}