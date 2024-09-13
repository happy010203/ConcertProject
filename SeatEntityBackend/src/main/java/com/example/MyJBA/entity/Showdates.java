package com.example.MyJBA.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "showdates")
public class Showdates {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer showdate_id;
	
	@Column(nullable = false, columnDefinition = "DATE")
	private String show_date;

	public Integer getShowdate_id() {
		return showdate_id;
	}

	public void setShowdate_id(Integer showdate_id) {
		this.showdate_id = showdate_id;
	}

	public String getShow_date() {
		return show_date;
	}

	public void setShow_date(String show_date) {
		this.show_date = show_date;
	}
	
	
	
}
