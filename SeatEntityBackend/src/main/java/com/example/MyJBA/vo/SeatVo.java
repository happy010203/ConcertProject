package com.example.MyJBA.vo;

import com.example.MyJBA.entity.Cinema;
import com.example.MyJBA.entity.Halls;
import com.example.MyJBA.entity.Showtimes;

public class SeatVo {
    
    private Integer seatId;

    private Cinema fkCinemaId;

    private Halls fkHallId;

    private Showtimes fkshowtimeId;

    private String seatNumber;

    private boolean seatAvailability;

    public Integer getSeatId() {
        return seatId;
    }

    public void setSeatId(Integer seatId) {
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
    

}
