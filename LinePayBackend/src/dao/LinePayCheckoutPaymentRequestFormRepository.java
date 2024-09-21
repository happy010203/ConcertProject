package com.example.MyJBA.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.MyJBA.entity.LinePayCheckoutPaymentRequestForm;
import com.example.MyJBA.entity.SeatEntity;


@Repository
public interface LinePayCheckoutPaymentRequestFormRepository extends JpaRepository<LinePayCheckoutPaymentRequestForm, Integer> {

    @Query(
        nativeQuery = true,
            value = """
                SELECT *
                FROM checkout_payment_request_form
                WHERE order_id = ?1
            """
    )
    Optional<LinePayCheckoutPaymentRequestForm> findByOrderId(String orderId);

}