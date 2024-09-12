package com.example.backend.Service;

import java.io.IOException;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.DTO.MovieDTO;
import com.example.backend.Entity.Movie;

public interface MovieService {
	
	List<Movie> searchByTitleOrDirector(String keyword);
	
	String addMovie(MovieDTO movie, MultipartFile file) throws IOException;

	Movie updateMovie(Integer id, MovieDTO movieDTO, MultipartFile file) throws IOException;
    
    
}