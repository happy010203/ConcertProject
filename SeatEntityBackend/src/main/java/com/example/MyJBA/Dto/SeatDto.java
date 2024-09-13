package com.example.MyJBA.Dto;

public class SeatDto {
    private String seatNumber;
    private Boolean seatAvailability;
    private Integer showtimeId;
    private Integer cinemaId;
    private Integer hallId;

    public SeatDto(String seatNumber, Boolean seatAvailability, Integer showtimeId, Integer cinemaId, Integer hallId) {
        this.seatNumber = seatNumber;
        this.seatAvailability = seatAvailability;
        this.showtimeId = showtimeId;
        this.cinemaId = cinemaId;
        this.hallId = hallId;
    }

    // seatNumber、seatAvailability兩個參數的建構子
    public SeatDto(String seatNumber, Boolean seatAvailability) {
        this.seatNumber = seatNumber;
        this.seatAvailability = seatAvailability;
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
    public Integer getShowtimeId() {
        return showtimeId;
    }
    public void setShowtimeId(Integer showtimeId) {
        this.showtimeId = showtimeId;
    }
    public Integer getCinemaId() {
        return cinemaId;
    }
    public void setCinemaId(Integer cinemaId) {
        this.cinemaId = cinemaId;
    }
    public Integer getHallId() {
        return hallId;
    }
    public void setHallId(Integer hallId) {
        this.hallId = hallId;
    }

    @Override
    public String toString() {
        return "SeatDto{" +
            "seatNumber='" + seatNumber + '\'' +
            ", seatAvailability=" + seatAvailability +
            ", showtimeId=" + showtimeId +
            ", cinemaId=" + cinemaId +
            ", hallId=" + hallId +
            '}';
    }

}
