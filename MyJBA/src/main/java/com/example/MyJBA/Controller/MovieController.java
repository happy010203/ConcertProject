package com.example.MyJBA.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.MyJBA.dao.MovieRepositoryDAO;
import com.example.MyJBA.entity.Movie;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "http://localhost:3000")
public class MovieController {

    @Autowired
    private MovieRepositoryDAO movieRepositoryDao;

    @GetMapping("/data")
    public ResponseEntity<List<Movie>> getMovies() {
        try {
            List<Movie> movies = movieRepositoryDao.findAll();
            return ResponseEntity.ok(movies);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}

