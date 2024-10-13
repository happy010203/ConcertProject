package com.example.backend.Controller;

import java.util.HashMap;
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

import com.example.backend.Service.LinePayService;

@RestController
@RequestMapping("/checkout")
public class LinePayController {

    @Autowired
    private LinePayService service;

    // 保存支付請求
    @PostMapping("/save")
    public ResponseEntity<Map<String, Object>> saveCheckoutPaymentRequest(@RequestBody Map<String, Object> requestBody) {
        service.saveCheckoutPaymentRequest(requestBody);

        // 創建返回的 Map
        Map<String, Object> response = new HashMap<>();
        response.put("message", "訂單保存成功");
        response.put("orderId", requestBody.get("orderId"));  // 可以返回剛保存的訂單ID

        return ResponseEntity.ok(response);
    }

    // 取得指定 ID 的支付詳細訊息
    @GetMapping("/details/{orderId}")
    public ResponseEntity<?> getCheckoutPaymentDetails(@PathVariable String orderId) {
        
        Map<String, Object> response = service.getCheckoutPaymentDetails(orderId);
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