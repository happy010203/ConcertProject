package com.example.backend.vo;

public class SeatVo {
    
    private Long seatid;

    private int fk_cinema_id;

    private int fk_hall_id;

    private int fk_showtime_id;

    private String seatNumber;

    private boolean seatAvailability;

    public Long getSeat_id() {
        return seatid;
    }

    public void setSeat_id(Long seatid) {
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
