package com.example.backend.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.Entity.LinePayProductForm;

@Repository
public interface LinePayProductFormRepo extends JpaRepository<LinePayProductForm, Integer> {
    

}