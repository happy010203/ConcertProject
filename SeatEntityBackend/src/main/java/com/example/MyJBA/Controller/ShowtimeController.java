package com.example.MyJBA.Controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.MyJBA.Service.ShowtimeService;
import com.example.MyJBA.dao.ShowtimeRepositoryDAO;
import com.example.MyJBA.entity.Cinema;
import com.example.MyJBA.entity.Showdates;
import com.example.MyJBA.entity.Showtimes;

@RestController
@RequestMapping("/api/showtimes")
public class ShowtimeController {

    @Autowired
    private ShowtimeRepositoryDAO showtimeRepositoryDao;
    
    @Autowired
    private ShowtimeService showtimeService;

    @GetMapping("/cinemas/{cinemaId}/showdates")
    public ResponseEntity<List<Showdates>> getShowdates(@PathVariable Integer cinemaId) {
        try {
            Cinema cinema = new Cinema();  // Assuming a constructor or method to fetch cinema by ID
            cinema.setCinema_id(cinemaId);

            List<Showtimes> showtimes = showtimeRepositoryDao.findDistinctBycinema(cinema);
            List<Showdates> showdates = showtimes.stream()
                    .map(Showtimes::getShowDate)
                    .distinct()
                    .collect(Collectors.toList());
            return ResponseEntity.ok(showdates);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/cinemas/{cinemaId}/showtimes/{showDateId}")
    public ResponseEntity<List<Showtimes>> getShowtimes(@PathVariable Integer cinemaId, @PathVariable Integer showDateId) {
        try {
            Cinema cinema = new Cinema();  
            cinema.setCinema_id(cinemaId);

            Showdates showDate = new Showdates();  
            showDate.setShowdate_id(showDateId);
            
            System.out.println(showDateId);
            List<Showtimes> showtimes = showtimeRepositoryDao.findByCinemaAndShowDate(cinema, showDate);
            for (Showtimes showtime : showtimes) {
            	System.out.println("-----");
                System.out.println("Showtime ID: " + showtime.getShowtime_id());
                System.out.println("Cinema: " + showtime.getCinema().getName());
                System.out.println("Show Date: " + showtime.getShowDate().getShow_date());
                System.out.println("Movie: " + showtime.getMovie().getTitle());
                System.out.println("Hall: " + showtime.getHall().getHall_number());
                System.out.println("Show Time: " + showtime.getShow_time());
                System.out.println("-----");
            }
            return ResponseEntity.ok(showtimes);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
    
    //從 showtime_id 打數據至前端
    @GetMapping("/area/{showtimeId}")
    public ResponseEntity<Showtimes> getShowtimeById(@PathVariable Integer showtimeId) {
        Showtimes showtime = showtimeService.getShowtimeById(showtimeId);
        if (showtime != null) {
            return ResponseEntity.ok(showtime);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}