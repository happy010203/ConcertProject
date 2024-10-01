package com.example.backend.Entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "itemorder")
public class Order {

    @Id
    @Column(name = "order_number")
    private Integer orderNumber;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Column(name = "amount")
    private Integer amount;

    @Column(name = "description")
    private String description;

    @Column(name = "item_name")
    private String itemName;

    @Column(name = "is_paid")
    private Boolean isPaid;

    // 默认构造方法
    public Order() {}

    // 带参数的构造方法
    public Order(Integer orderNumber, Integer userId, LocalDateTime createdDate, Integer amount, String description, String itemName, Boolean isPaid) {
        this.orderNumber = orderNumber;
        this.userId = userId;
        this.createdDate = createdDate;
        this.amount = amount;
        this.description = description;
        this.itemName = itemName;
        this.isPaid = isPaid;
    }

    // Getter 和 Setter 方法
    public Integer getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(Integer orderNumber) {
        this.orderNumber = orderNumber;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public Boolean getIsPaid() {
        return isPaid;
    }

    public void setIsPaid(Boolean isPaid) {
        this.isPaid = isPaid;
    }
}
