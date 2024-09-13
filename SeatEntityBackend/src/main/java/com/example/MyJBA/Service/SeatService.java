package com.example.MyJBA.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.MyJBA.Dto.SeatDto;
import com.example.MyJBA.dao.CinemaRepositoryDAO;
import com.example.MyJBA.dao.HallsRepositoryDAO;
import com.example.MyJBA.dao.SeatRepositoryEntityDAO;
import com.example.MyJBA.dao.ShowtimeRepositoryDAO;
import com.example.MyJBA.entity.Cinema;
import com.example.MyJBA.entity.Halls;
import com.example.MyJBA.entity.SeatEntity;
import com.example.MyJBA.entity.Showdates;
import com.example.MyJBA.entity.Showtimes;

@Service
public class SeatService {

    @Autowired
    private SeatRepositoryEntityDAO seatRepositoryEntityDAO;
    
    @Autowired
    private ShowtimeRepositoryDAO showtimeRepositoryDAO;

    @Autowired
    private CinemaRepositoryDAO cinemaRepositoryDAO;

    @Autowired
    private HallsRepositoryDAO hallsRepositoryDAO;

    //fk更新 ok
    // 將 DTO 轉換為實體並保存到資料庫
    public void saveSeatInfoFK(SeatDto seatDto) {
        // 根據 showtimeId 取得 Showtimes 資料
        Showtimes showtime = showtimeRepositoryDAO.findById(seatDto.getShowtimeId())
            .orElseThrow(() -> new RuntimeException("Showtime not found"));

        // 根據 showtime 自動取得相關的 Cinema 和 Halls 資訊
        Cinema cinema = showtime.getCinema();
        Halls hall = showtime.getHall();
            
        // 檢查該座位是否已存在
        SeatEntity seatEntity = seatRepositoryEntityDAO.findByShowtimeIdAndCinemaIdAndHallIdAndSeatNumber(
            showtime, cinema, hall, seatDto.getSeatNumber());

        if (seatEntity == null) {
            // 如果座位不存在，則創建新的 SeatEntity
            seatEntity = new SeatEntity();
            seatEntity.setSeatNumber(seatDto.getSeatNumber());
            seatEntity.setSeatAvailability(seatDto.getSeatAvailability());
            seatEntity.setShowtimeId(showtime);
            seatEntity.setCinemaId(cinema);
            seatEntity.setHallId(hall);
        } else {
            // 如果座位已存在，則更新座位狀態
            seatEntity.setSeatAvailability(false);
        }

        System.out.println("Updating seatEntity: " + seatEntity);

        seatRepositoryEntityDAO.save(seatEntity); // 保存到資料庫
    }

    //fk查詢(接AOI資料) ok
    // 獲取特定場次、影院、日期和廳的座位信息
    public List<SeatDto> getSeatsByShowtimeCinemaAndHallAndDate(Integer showtimeId, Integer cinemaId, Integer hallId, String showDate) {

        List<SeatEntity> seatEntities = seatRepositoryEntityDAO.findByShowtimeCinemaHallAndDate(showtimeId, cinemaId, hallId, showDate);

        // 將查詢結果轉換為 SeatDto
        List<SeatDto> seatDtos = seatEntities.stream().map(entity -> new SeatDto(
             entity.getSeatNumber(), 
             entity.getSeatAvailability(),
             entity.getShowtimeId().getShowtime_id(),  
             entity.getCinemaId().getCinema_id(),   
             entity.getHallId().getHall_id()      
        )).collect(Collectors.toList());
        seatDtos.forEach(seatDto -> System.out.println("SeatDto: " + seatDto));
                
        return seatDtos;
    }

    //fk查詢(1個 變數showtimeId)(備份) ok
    // 根據 showtimeId 查詢相關信息
    public List<SeatDto> getSeatsByShowtimeId(Integer showtimeId) {
        // 查詢 showtimeId 對應的 Showtimes 實體
        Showtimes showtimes = showtimeRepositoryDAO.findById(showtimeId)
            .orElseThrow(() -> new RuntimeException("Showtime not found"));

        // 從 Showtimes 實體中提取外鍵資訊
        Integer cinemaId = showtimes.getCinema().getCinema_id();  // 獲取 cinemaId
        Integer hallId = showtimes.getHall().getHall_id();  // 獲取 hallId
        String showDate = showtimes.getShowDate().getShow_date();  // 獲取 showDate

        // 根據提取的資訊查詢座位
        List<SeatEntity> seatEntities = seatRepositoryEntityDAO.findSeatsByCinemaIdAndHallIdAndShowDate(cinemaId, hallId, showDate);
        return seatEntities.stream()
        .map(seatEntity -> new SeatDto(
            seatEntity.getSeatNumber(), 
            seatEntity.getSeatAvailability(), 
            showtimeId, 
            cinemaId, 
            hallId))
        .collect(Collectors.toList());
    }





    
    //測試用
    // public SeatDto generateSeatInfo(Integer showtimeId, Integer cinemaId, Integer hallId, Long seatId) {
    //     // 生成 seat_number，例如："A1-1" 或 "B2-5" 等
    //     String seatNumber = "Section" + cinemaId + "-Hall" + hallId + "-Seat" + seatId;

    //     // 根據業務邏輯設置 seat_availability
    //     Boolean seatAvailability = true; // 假設預設為可用

    //     // 將資料放入 DTO 中
    //     return new SeatDto(seatNumber, seatAvailability, showtimeId, cinemaId, hallId);
    // }

    // 將 DTO 轉換為實體並保存到資料庫
    // public void saveSeatInfo(SeatDto seatDto) {
    //     // 檢查是否已存在該座位的資料
    //     SeatEntity seatEntity = seatRepositoryEntityDAO.findByShowtimeIdAndCinemaIdAndHallIdAndSeatNumber(
    //         seatDto.getShowtimeId(), seatDto.getCinemaId(), seatDto.getHallId(), seatDto.getSeatNumber());

    //     if (seatEntity == null) {
    //         // 如果座位不存在，則創建新的 SeatEntity
    //         seatEntity = new SeatEntity();
    //         seatEntity.setSeatNumber(seatDto.getSeatNumber());
    //         seatEntity.setSeatAvailability(seatDto.getSeatAvailability());
    //         seatEntity.setShowtimeId(seatDto.getShowtimeId());
    //         seatEntity.setCinemaId(seatDto.getCinemaId());
    //         seatEntity.setHallId(seatDto.getHallId());
    //     } else {
    //         // 如果座位已存在，則更新座位狀態
    //         seatEntity.setSeatAvailability(false);
    //     }

    //     System.out.println("Updating seatEntity: " + seatEntity);

    //     seatRepositoryEntityDAO.save(seatEntity); // 保存到資料庫
    // }

    // 獲取特定場次、影院和廳的座位信息
    // public List<SeatDto> getSeatsByShowtimeCinemaAndHall(Integer showtimeId, Integer cinemaId, Integer hallId) {
    //     List<SeatEntity> seatEntities = seatRepositoryEntityDAO.findByShowtimeIdAndCinemaIdAndHallId(showtimeId, cinemaId, hallId);
    //     return seatEntities.stream().map(entity -> new SeatDto(
    //         entity.getSeatNumber(), 
    //         entity.getSeatAvailability(),
    //         entity.getShowtimeId(),
    //         entity.getCinemaId(),
    //         entity.getHallId()
    //     )).collect(Collectors.toList());
    // }




}




