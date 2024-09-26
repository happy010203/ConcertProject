package com.example.backend.Controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.DTO.OrderDTO;
import com.example.backend.Entity.Order;
import com.example.backend.Repo.OrderRepo;
import com.example.backend.Service.PaymentService;

import ecpay.payment.integration.AllInOne;
import ecpay.payment.integration.domain.AioCheckOutALL;
import ecpay.payment.integration.exception.EcpayException;

@RestController
@RequestMapping("/api/orders")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;
    
    @Autowired
    OrderRepo orderRepo;
    
    private AllInOne allInOne;
    
    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
        this.allInOne = new AllInOne("3002607"); // 設定 ECPay 配置
    }

    
    @PostMapping("/checkout")
    public ResponseEntity<String> checkout(@RequestBody OrderDTO orderDTO) {
        try {
            Integer orderNumber = paymentService.generateOrderNumber();

            paymentService.addOrder(
                orderNumber,
                orderDTO.getUserId(),
                LocalDateTime.now(),
                orderDTO.getAmount(),
                orderDTO.getDescription(),
                orderDTO.getItemName(),
                false // 設定支付狀態為未支付
            );

            AioCheckOutALL obj = new AioCheckOutALL();
            obj.setMerchantTradeNo(orderNumber.toString());
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
            obj.setMerchantTradeDate(LocalDateTime.now().format(formatter));
            obj.setTotalAmount(orderDTO.getAmount().toString());
            obj.setTradeDesc(orderDTO.getDescription());
            obj.setItemName(orderDTO.getItemName());
            obj.setReturnURL("http://localhost:8443/movie/ecpay/paymentResult");
            obj.setOrderResultURL("http://localhost:8443/movie/ecpay/orderResult?MerchantTradeNo=" + orderNumber + "&MerchantTradeDate=" + LocalDateTime.now().format(formatter));

            String ecpayFormHtml = allInOne.aioCheckOut(obj, null);
            return ResponseEntity.ok(ecpayFormHtml);
        } catch (EcpayException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("結帳失敗：" + e.getMessage());
        }
    }

    // 获取指定用户的历史订单
    @GetMapping("/user")
    public ResponseEntity<List<Order>> getUserOrders(@RequestParam Integer userId) {
        List<Order> userOrders = paymentService.getOrdersByUserId(userId);
        return ResponseEntity.ok(userOrders);
    }

    // 获取订单详情
    @GetMapping("/details")
    public ResponseEntity<Order> getOrderDetails(@RequestParam Integer orderNumber) {
        try {
            Order order = paymentService.getOrderDetails(orderNumber);
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(404).body(null); // 处理订单未找到的情况
        }
    }
}

