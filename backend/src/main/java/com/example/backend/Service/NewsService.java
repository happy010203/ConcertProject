package com.example.backend.Service;

import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;
import com.example.backend.DTO.NewsDTO;

public interface NewsService {
	
	String addNews(NewsDTO news, MultipartFile file) throws IOException;
	
	String deletedById(int id,NewsDTO newsDTO);
	
}
