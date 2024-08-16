package com.example.backend.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tickets")
public class Seat {
	@Id
    @Column(name="ticket_id", length = 11)
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(name = "movie_id")
	private int movie;

	@Column(name = "cinema_id")
	private int cinema;
	@Column(name = "description")
	private String description;

	@Column(name = "seat_number")
	private String seat;

	@Column(name = "price")
	private int price;

	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getMovie() {
		return movie;
	}

	public void setMovie(int movie) {
		this.movie = movie;
	}

	public int getCinema() {
		return cinema;
	}

	public void setCinema(int cinema) {
		this.cinema = cinema;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getSeat() {
		return seat;
	}

	public void setSeat(String seat) {
		this.seat = seat;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

}
