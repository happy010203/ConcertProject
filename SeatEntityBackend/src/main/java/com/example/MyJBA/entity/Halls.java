package com.example.MyJBA.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "halls")
public class Halls {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer hall_id;
	
	@Column(nullable = false)
	private Integer price;
	
	@Column(nullable = false)
	private String hall_type;
	
	@Column(nullable = false)
	private int hall_number;

	public Integer getHall_id() {
		return hall_id;
	}

	public void setHall_id(Integer hall_id) {
		this.hall_id = hall_id;
	}

	public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}

	public String getHall_type() {
		return hall_type;
	}

	public void setHall_type(String hall_type) {
		this.hall_type = hall_type;
	}

	public int getHall_number() {
		return hall_number;
	}

	public void setHall_number(int hall_number) {
		this.hall_number = hall_number;
	}
	
	
}
