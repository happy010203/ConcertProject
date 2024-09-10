package com.example.MyJBA.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "cinemas")
public class Cinema {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cinema_id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String location;

    
	public Integer getCinema_id() {
		return cinema_id;
	}

	public void setCinema_id(Integer cinema_id) {
		this.cinema_id = cinema_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}


    
}
