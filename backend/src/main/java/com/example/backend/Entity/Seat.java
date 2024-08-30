package com.example.backend.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "seats")
public class Seat {
	@Id
    @Column(name="seat_id", length = 11)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long seatid;

	@Column(name = "fk_cinema_id")
	private int fk_cinema_id;

	@Column(name = "fk_hall_id")
	private int fk_hall_id;

	@Column(name = "fk_showtime_id")
	private int fk_showtime_id;

	@Column(name = "seat_number")
	private String seatNumber;

	@Column(name = "seat_availability")
	private boolean seatAvailability;

	public Long getSeatid() {
		return seatid;
	}

	public void setSeatid(Long seatid) {
		this.seatid = seatid;
	}

	public int getFk_cinema_id() {
		return fk_cinema_id;
	}

	public void setFk_cinema_id(int fk_cinema_id) {
		this.fk_cinema_id = fk_cinema_id;
	}

	public int getFk_hall_id() {
		return fk_hall_id;
	}

	public void setFk_hall_id(int fk_hall_id) {
		this.fk_hall_id = fk_hall_id;
	}

	public int getFk_showtime_id() {
		return fk_showtime_id;
	}

	public void setFk_showtime_id(int fk_showtime_id) {
		this.fk_showtime_id = fk_showtime_id;
	}

	public String getSeatNumber() {
		return seatNumber;
	}

	public void setSeatNumber(String seatNumber) {
		this.seatNumber = seatNumber;
	}

	public boolean isSeatAvailability() {
		return seatAvailability;
	}

	public void setSeatAvailability(boolean seatAvailability) {
		this.seatAvailability = seatAvailability;
	}

}
