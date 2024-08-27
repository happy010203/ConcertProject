package com.example.backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.example.backend.Entity.Movie;
import com.example.backend.Entity.Ticket;
import com.example.backend.Repo.MovieRepo;
import com.example.backend.Repo.TicketRepo;
import com.example.backend.Service.MovieService;

@RestController // 標記這個類為一個 REST 控制器，將會處理 HTTP 請求，並且方法的返回值會自動轉換為 JSON 或 XML 格式。
@RequestMapping("api/movie") // 指定這個控制器中所有方法的路徑前綴，這裡是 "api/v1"，表示該控制器處理的 URL 路徑會以 "/api/v1" 開頭。
public class CinemaController {

    @Autowired // 自動注入 CinemaRepo 類型的 bean，CinemaRepo 是用來訪問數據庫的存儲庫接口，通常用於執行 CRUD 操作。
    private MovieRepo movieRepo;

    @GetMapping(path = "/movies") // 映射 HTTP GET 請求到這個方法，並指定路徑為 "/api/v1/movies"。
    public List<Movie> getMovies() { // 定義一個返回類型為 List<Cinema> 的方法，用來返回一個電影列表。
        return movieRepo.findAll(); // 使用 cinemaRepo 的 findAll() 方法來查詢數據庫，並返回所有的 Cinema 實體。
    }
    
    @Autowired
    private TicketRepo ticketRepo;
    
    @GetMapping(path = "/tickets") 
    public List<Ticket> getTickets() { 
        return ticketRepo.findAll(); 
    }
    
    @Autowired
    private MovieService movieService;

    @GetMapping("/search")
    public List<Movie> searchByTitleOrDirector(@RequestParam String keyword) {
        return movieService.searchByTitleOrDirector(keyword);
    }
    
}
