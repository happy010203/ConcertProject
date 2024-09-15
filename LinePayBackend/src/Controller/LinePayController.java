package com.example.MyJBA.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.MyJBA.Service.LinePayService;


@RestController
@RequestMapping("/checkout")
public class LinePayController {

    @Autowired
    private LinePayService service;

    // 取得指定 ID 的支付詳細訊息
    @GetMapping("/details/{id}")
    public ResponseEntity<?> getDetails(@PathVariable Integer id) {
        Map<String, Object> response = service.getCheckoutPaymentDetails(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 發送支付請求到 Line Pay API
    @PostMapping("/payment")
    public ResponseEntity<?> processPaymentRequest(@RequestBody Map<String, Object> requestBody) {
        // 將傳入的 request body 傳遞給 service 進行處理
        Map<String, Object> response = service.sendPaymentRequest(requestBody);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
}
