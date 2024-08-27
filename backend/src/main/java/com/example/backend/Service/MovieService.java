package com.example.backend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.Entity.Movie;
import com.example.backend.Repo.MovieRepo;

@Service
public class MovieService {
	@Autowired
    private MovieRepo movieRepo;

    public List<Movie> searchByTitleOrDirector(String keyword) {
        return movieRepo.searchByTitleOrDirector(keyword);
    }
}
