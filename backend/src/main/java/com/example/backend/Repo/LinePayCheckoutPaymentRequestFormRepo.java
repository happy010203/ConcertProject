package com.example.backend.Repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.backend.Entity.LinePayCheckoutPaymentRequestForm;

@Repository
public interface LinePayCheckoutPaymentRequestFormRepo extends JpaRepository<LinePayCheckoutPaymentRequestForm, Integer> {

    @Query(
        nativeQuery = true,
            value = """
                SELECT *
                FROM line_pay_checkout_payment_request_form
                WHERE order_id = ?1
            """
    )
    Optional<LinePayCheckoutPaymentRequestForm> findByOrderId(String orderId);

}