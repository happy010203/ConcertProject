package com.example.MyJBA.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.MyJBA.entity.LinePayCheckoutPaymentRequestForm;


@Repository
public interface LinePayCheckoutPaymentRequestFormRepository extends JpaRepository<LinePayCheckoutPaymentRequestForm, Integer> {
    

}