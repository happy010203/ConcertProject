package com.example.MyJBA.Controller;

import com.example.MyJBA.dao.HallsRepositoryDAO;
import com.example.MyJBA.entity.Halls;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/halls")
public class HallsController {

    @Autowired
    private HallsRepositoryDAO hallsRepositoryDAO;

    @GetMapping
    public List<Halls> getAllHalls() {
        return hallsRepositoryDAO.findAll();
    }

    @GetMapping("/{hallId}")
    public Halls getHallById(@PathVariable("hallId") int hallId) {
        return hallsRepositoryDAO.findById(hallId).orElse(null);
    }
}
