package com.example.backend.DTO;

import java.time.LocalDateTime;

public class OrderDTO {
	
	private Integer orderNumber;
	private Integer userId;
	private LocalDateTime createdDate;
    private Integer amount;
    private String description;
    private String itemName;
    private Boolean isPaid;
    
	public Integer getOrderNumber() {
		return orderNumber;
	}
	public Integer getUserId() {
		return userId;
	}
	public LocalDateTime getCreatedDate() {
		return createdDate;
	}
	public Integer getAmount() {
		return amount;
	}
	public String getDescription() {
		return description;
	}
	public String getItemName() {
		return itemName;
	}
	public Boolean getIsPaid() {
		return isPaid;
	}
	public void setOrderNumber(Integer orderNumber) {
		this.orderNumber = orderNumber;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public void setCreatedDate(LocalDateTime createdDate) {
		this.createdDate = createdDate;
	}
	public void setAmount(Integer amount) {
		this.amount = amount;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public void setIsPaid(Boolean isPaid) {
		this.isPaid = isPaid;
	}
}
