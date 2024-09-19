package com.example.backend.Service;

import java.util.List;

import com.example.backend.DTO.SeatDTO;

public interface SeatService {
	
	void addSeat(SeatDTO seatDTO);
	
	List<SeatDTO> getSeatsByShowtimeCinemaAndHallAndDate(Integer showtimeId, Integer cinemaId, Integer hallId,
			String showDate);
	
	List<SeatDTO> getSeatsByShowtimeId(Integer showtimeId);
}
