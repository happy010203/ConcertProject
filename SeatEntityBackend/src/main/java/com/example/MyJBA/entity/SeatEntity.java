package com.example.MyJBA.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

//foriegn key
@Entity
@Table(name = "Seat_Info_Test")
public class SeatEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "showtime_id", nullable = true, referencedColumnName = "showtime_id")
    private Showtimes showtimeId;

    @ManyToOne
    @JoinColumn(name = "cinema_id", nullable = true, referencedColumnName = "cinema_id")
    private Cinema cinemaId;

    @ManyToOne
    @JoinColumn(name = "hall_id", nullable = true, referencedColumnName = "hall_id")
    private Halls hallId;

    @Column(name = "seat_number", nullable = false)
    private String seatNumber;

    @Column(name = "seat_availability", nullable = false, columnDefinition = "TINYINT(1)")
    private Boolean seatAvailability;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Showtimes getShowtimeId() {
        return showtimeId;
    }

    public void setShowtimeId(Showtimes showtimeId) {
        this.showtimeId = showtimeId;
    }

    public Cinema getCinemaId() {
        return cinemaId;
    }

    public void setCinemaId(Cinema cinemaId) {
        this.cinemaId = cinemaId;
    }

    public Halls getHallId() {
        return hallId;
    }

    public void setHallId(Halls hallId) {
        this.hallId = hallId;
    }

    public String getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(String seatNumber) {
        this.seatNumber = seatNumber;
    }

    public Boolean getSeatAvailability() {
        return seatAvailability;
    }

    public void setSeatAvailability(Boolean seatAvailability) {
        this.seatAvailability = seatAvailability;
    }

    
}