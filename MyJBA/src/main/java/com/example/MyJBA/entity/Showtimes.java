package com.example.MyJBA.entity;

import java.sql.Time;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "showtimes")
public class Showtimes {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer showtime_id;
	
	@ManyToOne
    @JoinColumn(name = "fk_cinema_id", nullable = false, referencedColumnName = "cinema_id")
	private Cinema cinema; 
	
	@ManyToOne
    @JoinColumn(name = "fk_show_date_id", nullable = false, referencedColumnName = "showdate_id")
	private Showdates showDate; 
	
	@ManyToOne
    @JoinColumn(name = "fk_movie_id", nullable = false, referencedColumnName = "movie_id")
	private Movie movie; 
	
	@ManyToOne
    @JoinColumn(name = "fk_hall_id", nullable = false, referencedColumnName = "hall_id")
	private Halls hall; 
	
	@Column(nullable = false)
	private Time show_time;

	public Integer getShowtime_id() {
		return showtime_id;
	}

	public void setShowtime_id(Integer showtime_id) {
		this.showtime_id = showtime_id;
	}

	public Cinema getCinema() {
		return cinema;
	}

	public void setCinema(Cinema cinema) {
		this.cinema = cinema;
	}

	public Showdates getShowDate() {
		return showDate;
	}

	public void setShowDate(Showdates showDate) {
		this.showDate = showDate;
	}

	public Movie getMovie() {
		return movie;
	}

	public void setMovie(Movie movie) {
		this.movie = movie;
	}

	public Halls getHall() {
		return hall;
	}

	public void setHall(Halls hall) {
		this.hall = hall;
	}

	public Time getShow_time() {
		return show_time;
	}

	public void setShow_time(Time show_time) {
		this.show_time = show_time;
	}

	
}
