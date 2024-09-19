package com.example.backend.Service;

import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.DTO.MovieDTO;
import com.example.backend.DTO.NewsDTO;
import com.example.backend.Entity.Movie;
import com.example.backend.Entity.News;

public interface NewsService {
	
	String addNews(NewsDTO news, MultipartFile file) throws IOException;
	
	News updateNews(Integer id, NewsDTO newsDTO, MultipartFile file) throws IOException;
	
}
