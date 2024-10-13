package com.example.backend.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.Entity.LinePayProductPackageForm;

@Repository
public interface LinePAyProductPackageFormRepo extends JpaRepository<LinePayProductPackageForm, Integer> {
    
}