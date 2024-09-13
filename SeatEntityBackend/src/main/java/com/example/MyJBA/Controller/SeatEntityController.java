package com.example.MyJBA.Controller;

import java.util.List;
import java.util.Collections;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.MyJBA.Dto.SeatDto;
import com.example.MyJBA.Service.SeatService;

@RestController
@RequestMapping("/api/SeatEntity")
public class SeatEntityController {
    @Autowired
    private SeatService seatService;

    //fk更新 ok
    @PutMapping("/save/{showtimeId}/{seatNumber}")
    public ResponseEntity<String> saveSeatInfoFK(@PathVariable Integer showtimeId, 
                                @PathVariable String seatNumber, 
                                @RequestBody SeatDto seatDto) {
        try {
            // 檢查 SeatDto 是否非空
            if (seatDto == null) {
                return ResponseEntity.badRequest().body("SeatDto cannot be null");
            }

            // 設置 DTO 的相關資訊
            seatDto.setShowtimeId(showtimeId);
            seatDto.setSeatNumber(seatNumber);

            // 調用 SeatService 的 saveSeatInfo 函數來保存座位資訊，其他外鍵由後端查詢
            seatService.saveSeatInfoFK(seatDto);

            // 返回成功響應
            return ResponseEntity.ok("Seat information saved successfully");

        } catch (Exception e) {
            // 捕獲並處理異常，返回 500 狀態碼和錯誤訊息
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving seat information: " + e.getMessage());
        }
    }

    //fk查詢(需自行檢測) ok
    // @GetMapping("/seatsResearch/{showtimeId}/{cinemaId}/{hallId}/{showDate}")
    // public ResponseEntity<List<SeatDto>> getSeatsFK(
    //         @PathVariable Integer showtimeId, 
    //         @PathVariable Integer cinemaId, 
    //         @PathVariable Integer hallId, 
    //         @PathVariable String showDate) {

    //     try {
    //         // 調用 service 層的方法來獲取座位信息
    //         List<SeatDto> seats = seatService.getSeatsByShowtimeCinemaAndHallAndDate(showtimeId, cinemaId, hallId, showDate);

    //         // 返回成功響應和座位信息
    //         return ResponseEntity.ok(seats);

    //     } catch (Exception e) {
    //         // 捕獲並處理異常，返回 500 狀態碼和錯誤訊息
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    //     }
    // }

    //fk查詢(接AOI資料) ok
    @GetMapping("/seatsResearch/{showtimeId}/{cinemaId}/{hallId}/{showDate}")
    public ResponseEntity<List<SeatDto>> getSeats(
            @PathVariable Integer showtimeId, 
            @PathVariable Integer cinemaId, 
            @PathVariable Integer hallId, 
            @PathVariable String showDate) {

        try {
            // 調用 service 層的方法來獲取座位信息
            List<SeatDto> seats = seatService.getSeatsByShowtimeCinemaAndHallAndDate(showtimeId, cinemaId, hallId, showDate);

            // 返回成功響應和座位信息
            return ResponseEntity.ok(seats);

        } catch (Exception e) {
            // 捕獲並處理異常，返回 500 狀態碼和錯誤訊息
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Collections.emptyList()); // 返回空的列表，表示沒有數據
        }
    }

    //fk查詢(一個參數showtimeId)(備份) ok
    @GetMapping("/seatsResearch/{showtimeId}")
    public ResponseEntity<List<SeatDto>> getSeatsByShowtimeId(@PathVariable Integer showtimeId) {
        try {
            // 根據 showtimeId 查詢相關的 cinemaId, hallId 和 showDate
            List<SeatDto> seats = seatService.getSeatsByShowtimeId(showtimeId);

            // 返回座位信息
            return ResponseEntity.ok(seats);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Collections.emptyList()); // 返回空列表表示沒有數據
        }
    }
    



    // 4個變數
    // 調用 SeatService 的 generateSeatInfo 函數
    // @GetMapping("/generate/{showtimeId}/{cinemaId}/{hallId}/{seatId}")
    // public SeatDto generateSeatInfo(@PathVariable Integer showtimeId, 
    //                                 @PathVariable Integer cinemaId, 
    //                                 @PathVariable Integer hallId, 
    //                                 @PathVariable Long seatId) {
    //     System.out.println("showtimeId: " + showtimeId);
    //     System.out.println("cinemaId: " + cinemaId);
    //     System.out.println("hallId: " + hallId);
    //     System.out.println("seatId: " + seatId);
        
    //     return seatService.generateSeatInfo(showtimeId, cinemaId, hallId, seatId);
    // }

    // 更新
    // TRUE(1)代表可以選，FALSE(0)代表不能選
    // @PutMapping("/save/{showtimeId}/{cinemaId}/{hallId}/{seatNumber}")
    // public void saveSeatInfo(@PathVariable Integer showtimeId, 
    //                           @PathVariable Integer cinemaId, 
    //                           @PathVariable Integer hallId, 
    //                           @PathVariable String seatNumber, 
    //                           @RequestBody SeatDto seatDto) {
    //     // 設置 DTO 的相關資訊
    //     seatDto.setShowtimeId(showtimeId);
    //     seatDto.setCinemaId(cinemaId);
    //     seatDto.setHallId(hallId);
    //     seatDto.setSeatNumber(seatNumber);

    //     // 調用 SeatService 的 saveSeatInfo 函數來保存座位資訊
    //     seatService.saveSeatInfoFK(seatDto);
    // }

    //查詢
    // @GetMapping("/search/{showtimeId}/{cinemaId}/{hallId}")
    // public List<SeatDto> getSeatsByShowtimeCinemaAndHall(@PathVariable Integer showtimeId, 
    //                                                      @PathVariable Integer cinemaId, 
    //                                                      @PathVariable Integer hallId) {
    //     return seatService.getSeatsByShowtimeCinemaAndHall(showtimeId, cinemaId, hallId);
    // }
}
