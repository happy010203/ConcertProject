package com.example.backend.Controller;

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

import com.example.backend.Entity.Cinema;
import com.example.backend.Entity.Seat;
import com.example.backend.Entity.TicketRequest;
import com.example.backend.Repo.CinemaRepo;
import com.example.backend.Repo.SeatRepo;
import com.example.backend.vo.SeatVo;

@RestController // 標記這個類為一個 REST 控制器，將會處理 HTTP 請求，並且方法的返回值會自動轉換為 JSON 或 XML 格式。
@RequestMapping("api/v1") // 指定這個控制器中所有方法的路徑前綴，這裡是 "api/v1"，表示該控制器處理的 URL 路徑會以 "/api/v1" 開頭。
public class CinemaController {

    @Autowired // 自動注入 CinemaRepo 類型的 bean，CinemaRepo 是用來訪問數據庫的存儲庫接口，通常用於執行 CRUD 操作。
    private CinemaRepo cinemaRepo;

    @GetMapping(path = "/movies") // 映射 HTTP GET 請求到這個方法，並指定路徑為 "/api/v1/movies"。
    public List<Cinema> getConcerts() { // 定義一個返回類型為 List<Cinema> 的方法，用來返回一個電影列表。
        return cinemaRepo.findAll(); // 使用 cinemaRepo 的 findAll() 方法來查詢數據庫，並返回所有的 Cinema 實體。
    }
    
    @Autowired
    private SeatRepo seatRepo;
    
    //查詢全部
    @GetMapping(path = "seats") 
    public List<Seat> getSeats() { 
        return seatRepo.findAll(); 
    }

    //計算剩餘位置數
    //TRUE(1)代表可以選，FALSE(0)代表不能選
    @PostMapping(path = "remainingSeat")
    public Map remainingSeat(@RequestBody Map<String, Map<String, Integer>> remainingSeatsReact) {
		System.out.println("remainingSeat...");
		
        // 取得 remainingSeats 對象
        Map<String, Integer> remainingSeats = remainingSeatsReact.get("remainingSeats");
        Map<String, Object> map = new HashMap<>();

        for (String section : remainingSeats.keySet()) {
            int totalSeats = remainingSeats.get(section);

            // 查詢該區域的已預訂座位
            List<Seat> reservedSeats = seatRepo.findBySeatNumberStartingWithAndSeatAvailability(section, false);
            int reservedSeatCount = reservedSeats.size();
            int remainingSeatCount = totalSeats - reservedSeatCount;
            System.out.println("remainingSeatCount: " + remainingSeatCount);
            // 把每個區域的剩餘座位數加入結果
            map.put(section + "_remainingSeats", remainingSeatCount);
        }
        map.put("success", true);

        return map;
    }

    //取得已預訂座位
    @GetMapping("getSeatInfo")
    public Map getSeatInfo(@RequestParam List<String> seatNumbers) {
        Map<String, Object> map = new HashMap<>();
        List<SeatVo> listVo = new ArrayList<>();

        for (String seatNumber : seatNumbers) {
            List<Seat> seats = seatRepo.findBySeatNumber(seatNumber);
            for (Seat seat : seats) {
                SeatVo vo = new SeatVo();
                vo.setSeatNumber(seat.getSeatNumber());
                vo.setSeatAvailability(seat.isSeatAvailability());
                listVo.add(vo);
            }
        }

        map.put("success", true);
        map.put("list", listVo);
        
        return map;
    }

    //尚未與前端串接
    //查詢By Id
    @GetMapping(path = "getSeatBySeatid") 
    public Seat getSeatBySeatid(Long seatid) { 
		System.out.println("getSeatBySeatid...");
        return seatRepo.findById(1L).orElse(null);
    }

    //尚未與前端串接，可參eclipse myjpa page部份
    //先保留，更新會在AOI那邊要用
    //更新
    @PostMapping(path = "update")
    public Map updateSeatNumber() {
		System.out.println("update...");
		Map map = new HashMap();
        int x = seatRepo.updateSeatNumber("B1-1", 1L);
		
		map.put("success", true);
	    map.put("x", x);

        return map;
    }

}
