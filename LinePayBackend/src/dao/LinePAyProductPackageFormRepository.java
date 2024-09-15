package com.example.MyJBA.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.MyJBA.entity.LinePayProductPackageForm;

@Repository
public interface LinePAyProductPackageFormRepository extends JpaRepository<LinePayProductPackageForm, Integer> {
    
}