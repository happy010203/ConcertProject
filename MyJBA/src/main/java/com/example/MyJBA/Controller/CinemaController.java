package com.example.MyJBA.Controller;

import com.example.MyJBA.dao.CinemaRepositoryDAO;
import com.example.MyJBA.entity.Cinema;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class CinemaController {

    @Autowired
    private CinemaRepositoryDAO cinemaRepositoryDao;

    @GetMapping("/cinemas")
    public ResponseEntity<List<Cinema>> getAllCinemas() {
        try {
            List<Cinema> cinemas = cinemaRepositoryDao.findAll();
            return new ResponseEntity<>(cinemas, HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error fetching cinemas: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
