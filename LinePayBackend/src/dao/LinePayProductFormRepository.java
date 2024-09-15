package com.example.MyJBA.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.MyJBA.entity.LinePayProductForm;


@Repository
public interface LinePayProductFormRepository extends JpaRepository<LinePayProductForm, Integer> {
    

}