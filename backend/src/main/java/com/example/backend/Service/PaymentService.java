package com.example.backend.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.Entity.Order;
import com.example.backend.Repo.OrderRepo;

@Service
public class PaymentService {

    @Autowired
    private OrderRepo orderRepo;

    private static final String PAYMENT_SUCCESS = "已付款"; // 定义支付成功的状态
    
    public Integer generateOrderNumber() {
        // 生成 10 位随机整数作为订单号
        Random random = new Random();
        return 100000000 + random.nextInt(900000000);
    }

    // 新增订单
    public Order addOrder(Integer orderNumber, Integer userId, LocalDateTime createdDate, Integer amount, String description, String itemName, Boolean isPaid) {
        // 使用现有构造函数创建对象时传递所有必要的字段
        Order newOrder = new Order();
        newOrder.setOrderNumber(orderNumber); // 设置生成的订单号
        newOrder.setUserId(userId);
        newOrder.setCreatedDate(createdDate);
        newOrder.setAmount(amount);
        newOrder.setDescription(description);
        newOrder.setItemName(itemName);
        newOrder.setIsPaid(isPaid);

        return orderRepo.save(newOrder); // 保存到数据库
    }

    // 更新订单
    public Order updateOrder(Integer orderNumber, LocalDateTime createdDate, Integer amount, String description, String itemName, Boolean isPaid) {
    	Order existingOrder = orderRepo.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new RuntimeException("未找到订单，订单号：" + orderNumber));

        if (createdDate != null) existingOrder.setCreatedDate(createdDate);
        if (amount != null) existingOrder.setAmount(amount);
        if (description != null) existingOrder.setDescription(description);
        if (itemName != null) existingOrder.setItemName(itemName);
        if (isPaid != null) existingOrder.setIsPaid(isPaid);

        return orderRepo.save(existingOrder);
    }

    public Order getOrderDetails(Integer orderNumber) {
        return orderRepo.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new RuntimeException("未找到订单，订单号：" + orderNumber));
    }

    // 更新支付数据
    public void updatePaydata(Order orderData, LocalDateTime merchantTradeDate, String payMethod, String payStatus) {
        orderData.setIsPaid(PAYMENT_SUCCESS.equals(payStatus)); // 根据支付状态更新支付状态
        orderData.setDescription(payStatus); // 更新描述为支付状态
        orderData.setCreatedDate(merchantTradeDate); // 更新订单日期
        orderRepo.save(orderData); // 保存更新后的数据
    }
    
    public List<Order> getOrdersByUserId(Integer userId) {
        return orderRepo.findByUserId(userId); // 通过用户ID获取订单
    }
}
