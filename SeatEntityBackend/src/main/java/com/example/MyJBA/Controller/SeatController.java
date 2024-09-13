package com.example.MyJBA.Controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Collections;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.MyJBA.Dto.SeatDto;
import com.example.MyJBA.Service.SeatService;
import com.example.MyJBA.dao.SeatRepositoryDAO;
import com.example.MyJBA.entity.Halls;
import com.example.MyJBA.entity.Seat;
import com.example.MyJBA.vo.SeatVo;


@RestController // 標記這個類為一個 REST 控制器，將會處理 HTTP 請求，並且方法的返回值會自動轉換為 JSON 或 XML 格式。
@RequestMapping("api/v1") // 指定這個控制器中所有方法的路徑前綴，這裡是 "api/v1"，表示該控制器處理的 URL 路徑會以 "/api/v1" 開頭。
public class SeatController {
    
    @Autowired
    private SeatRepositoryDAO seatRepositoryDAO;
    
    //抓Seat 的 fk_showtime_id
    @GetMapping("/getSeatsShowtimeId")
    public Map getSeatsShowtimeId() {
        System.out.println("getSeatsShowtimeId...");
        Map rs = new HashMap();

        List<Seat> list = 
            seatRepositoryDAO.findByFkshowtimeId(1);
		List<SeatVo> listVo = new ArrayList<>();
		for(Seat seat:list) {
			SeatVo vo = new SeatVo();
			BeanUtils.copyProperties(seat, vo);
			listVo.add(vo);
		}
		
		rs.put("success", true);
		rs.put("book", listVo);

        return rs;
    }

    

    
    //未完成
    //從 get 網址中取出 showtime_id 
    // @GetMapping("/seats")
    // public ResponseEntity<List<Seat>> getSeatsByShowtimeId(@RequestParam Long showtime_id) {
    //     SeatService seatService = new SeatService();
    //     List<Seat> seats = seatService.getSeatsByShowtimeId(showtime_id);
    //     return ResponseEntity.ok(seats);
    // }

    @GetMapping("/cinemas/{cinemaId}/showtimes/{showDateId}/{showtimeid}/seatNumber")
    public Map<String, Object> getSeatsByShowtimeId(
        @PathVariable(value="cinemaId") Long cinemaId,
        @PathVariable(value="showDateId") Long showDateId,
        @PathVariable(value="showtimeid") Long showtimeid) {

        Map<String, Object> rs = new HashMap();


        return rs;
    }


}
