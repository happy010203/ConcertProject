package com.example.backend.Service.Impl;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.DTO.MovieDTO;
import com.example.backend.DTO.NewsDTO;
import com.example.backend.Entity.Movie;
import com.example.backend.Entity.News;
import com.example.backend.Entity.Movie.Status;
import com.example.backend.Repo.NewsRepo;
import com.example.backend.Service.NewsService;

import jakarta.transaction.Transactional;

@Service
public class NewsImpl implements NewsService{
	
	NewsDTO newsDTO;
	
	@Autowired
	NewsRepo newsRepo;
	
	@Value("${file.upload-dir}")
	private String uploadPath;

	@Value("${app.base-url}")
	private String baseUrl;
	@Override
	public String addNews(NewsDTO newsDTO, MultipartFile file) throws IOException {
		
		if (file.isEmpty()) {
	        return "Please select a file!";
	    }

	    // 获取文件名
	    String fileName = file.getOriginalFilename();
	    if (fileName == null || fileName.isEmpty()) {
	        return "Invalid file name!";
	    }

	    // 创建目标路径
	    Path targetPath = Paths.get(uploadPath).resolve(fileName);

	    // 确保目标目录存在
	    try {
	        Files.createDirectories(targetPath.getParent());
	    } catch (IOException e) {
	        e.printStackTrace();
	        return "Error creating directories: " + e.getMessage();
	    }

	    // 保存文件
	    try (InputStream inputStream = file.getInputStream()) {
	        Files.copy(inputStream, targetPath, StandardCopyOption.REPLACE_EXISTING);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return "Error saving file: " + e.getMessage();
	    }

	    
	    News news = new News();
	    BeanUtils.copyProperties(newsDTO, news);
	    news.setCreatedTime(LocalDateTime.now());

	    // 创建完整的 URL
	    String fileUrl = baseUrl  + "/news/" + fileName;  // 完整的 URL
	    news.setImg(fileUrl);  // 保存完整的图片 URL
	    newsRepo.save(news);

	    return "News added successfully!";
	}

	@Override
	public News updateNews(Integer id, NewsDTO newsDTO, MultipartFile file) throws IOException {
	     News news = newsRepo.findById(id).orElseThrow(() -> new RuntimeException("News not found"));

	     // 更新电影信
	     news.setText(newsDTO.getText());
	     news.setCreatedTime(LocalDateTime.now());

	     

	     // 处理图片
	     if (file != null && !file.isEmpty()) {
	         // 删除旧图片文件
	         if (news.getImg() != null) {
	             String oldFileName = news.getImg().substring(news.getImg().lastIndexOf("/") + 1);
	             Path oldFilePath = Paths.get(uploadPath).resolve(oldFileName);
	             try {
	                 Files.deleteIfExists(oldFilePath);
	             } catch (IOException e) {
	                 e.printStackTrace();
	                 // 处理删除文件异常
	             }
	         }

	         // 上传新图片
	         String fileName = file.getOriginalFilename();
	         Path targetPath = Paths.get(uploadPath).resolve(fileName);
	         try {
	             Files.createDirectories(targetPath.getParent());
	             try (InputStream inputStream = file.getInputStream()) {
	                 Files.copy(inputStream, targetPath, StandardCopyOption.REPLACE_EXISTING);
	             }
	         } catch (IOException e) {
	             e.printStackTrace();
	             // 处理上传文件异常
	         }

	         // 更新图片 URL
	         String fileUrl = baseUrl + "/img/" + fileName;
	         news.setImg(fileUrl);
	     } else {
	         // 图片未更新时保留原图片
	         news.setImg(newsDTO.getImg());
	     }
	     return newsRepo.save(news);
	 }


}
