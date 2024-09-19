package com.example.backend.Service.Impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.DTO.SeatDTO;
import com.example.backend.Entity.Cinema;
import com.example.backend.Entity.Hall;
import com.example.backend.Entity.Seat;
import com.example.backend.Entity.Showtime;
import com.example.backend.Repo.CinemaRepo;
import com.example.backend.Repo.HallRepo;
import com.example.backend.Repo.SeatRepo;
import com.example.backend.Repo.ShowtimeRepo;
import com.example.backend.Service.SeatService;

@Service
public class SeatServiceImpl implements SeatService{

	@Autowired
	private SeatRepo seatRepo;

	@Autowired
	private ShowtimeRepo showtimeRepo;

	@Autowired
	private CinemaRepo cinemaRepo;

	@Autowired
	private HallRepo hallRepo;
	
	// 將 DTO 轉換為實體並保存到資料庫
	public void addSeat(SeatDTO seatDTO) {
		// 根據 showtimeId 取得 Showtimes 資料
		Showtime showtime = showtimeRepo.findById(seatDTO.getShowtimeId())
				.orElseThrow(() -> new RuntimeException("Showtime not found"));

		// 根據 showtime 自動取得相關的 Cinema 和 Halls 資訊
		Cinema cinema = showtime.getCinema();
		Hall hall = showtime.getHall();

		// 檢查該座位是否已存在
		Seat seat = seatRepo.findByShowtimeIdAndCinemaIdAndHallIdAndSeatNumber(showtime,
				cinema, hall, seatDTO.getSeatNumber());

		if (seat == null) {
			// 如果座位不存在，則創建新的 SeatEntity
			seat = new Seat();
			seat.setSeatNumber(seatDTO.getSeatNumber());
			seat.setSeatAvailability(seatDTO.getSeatAvailability());
			seat.setShowtimeId(showtime);
			seat.setCinemaId(cinema);
			seat.setHallId(hall);
		} else {
			// 如果座位已存在，則更新座位狀態
			seat.setSeatAvailability(false);
		}

		seatRepo.save(seat); // 保存到資料庫
	}
	
	// 獲取特定場次、影院、日期和廳的座位信息
	public List<SeatDTO> getSeatsByShowtimeCinemaAndHallAndDate(Integer showtimeId, Integer cinemaId, Integer hallId,
			String showDate) {

		List<Seat> seatEntities = seatRepo.findByShowtimeCinemaHallAndDate(showtimeId, cinemaId,
				hallId, showDate);

		// 將查詢結果轉換為 SeatDto
		List<SeatDTO> seatDtos = seatEntities.stream()
				.map(entity -> new SeatDTO(entity.getSeatNumber(), entity.getSeatAvailability(),
						entity.getShowtimeId().getShowtime_id(), entity.getCinemaId().getCinema_id(),
						entity.getHallId().getHall_id()))
				.collect(Collectors.toList());
		seatDtos.forEach(seatDto -> System.out.println("SeatDto: " + seatDto));

		return seatDtos;
	}
	
    // 根據 showtimeId 查詢相關信息
    public List<SeatDTO> getSeatsByShowtimeId(Integer showtimeId) {
        // 查詢 showtimeId 對應的 Showtimes 實體
        Showtime showtime = showtimeRepo.findById(showtimeId)
            .orElseThrow(() -> new RuntimeException("Showtime not found"));

        // 從 Showtimes 實體中提取外鍵資訊
        Integer cinemaId = showtime.getCinema().getCinema_id();  // 獲取 cinemaId
        Integer hallId = showtime.getHall().getHall_id();  // 獲取 hallId
        String showDate = showtime.getShowDate().getShow_date();  // 獲取 showDate

        // 根據提取的資訊查詢座位
        List<Seat> seatEntities = seatRepo.findSeatsByCinemaIdAndHallIdAndShowDate(cinemaId, hallId, showDate);
        return seatEntities.stream()
        .map(seatEntity -> new SeatDTO(
            seatEntity.getSeatNumber(), 
            seatEntity.getSeatAvailability(), 
            showtimeId, 
            cinemaId, 
            hallId))
        .collect(Collectors.toList());
    }
}
