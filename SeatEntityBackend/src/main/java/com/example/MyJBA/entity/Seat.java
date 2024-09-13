package com.example.MyJBA.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "seats")
public class Seat {
	@Id
    @Column(name="seat_id", length = 11)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer seatId;

	@ManyToOne
    @JoinColumn(name = "fk_cinema_id", nullable = true, referencedColumnName = "cinema_id")
	private Cinema fkCinemaId;

	@ManyToOne
    @JoinColumn(name = "fk_hall_id", nullable = true, referencedColumnName = "hall_id")
	private Halls fkHallId;

	@ManyToOne
    @JoinColumn(name = "fk_showtime_id", nullable = true, referencedColumnName = "showtime_id")
	private Showtimes fkshowtimeId;
	
	@ManyToOne
    @JoinColumn(name = "fk_movie_id", nullable = true, referencedColumnName = "movie_id")
	private Movie fkmovieId;

	@Column(name = "seat_number")
	private String seatNumber;

	@Column(name = "seat_availability", columnDefinition = "TINYINT(1)")
	private boolean seatAvailability;

	public Integer  getSeatId() {
		return seatId;
	}

	public void setSeatId(Integer  seatId) {
		this.seatId = seatId;
	}

	public Cinema getFkCinemaId() {
		return fkCinemaId;
	}

	public void setFkCinemaId(Cinema fkCinemaId) {
		this.fkCinemaId = fkCinemaId;
	}

	public Halls getFkHallId() {
		return fkHallId;
	}

	public void setFkHallId(Halls fkHallId) {
		this.fkHallId = fkHallId;
	}

	public Showtimes getFkshowtimeId() {
		return fkshowtimeId;
	}

	public void setFkshowtimeId(Showtimes fkshowtimeId) {
		this.fkshowtimeId = fkshowtimeId;
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

	public Movie getFkmovieId() {
		return fkmovieId;
	}

	public void setFkmovieId(Movie fkmovieId) {
		this.fkmovieId = fkmovieId;
	}
}
