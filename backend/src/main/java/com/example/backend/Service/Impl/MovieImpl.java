package com.example.backend.Service.Impl;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;

import java.io.IOException;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.DTO.MovieDTO;
import com.example.backend.Entity.Movie;
import com.example.backend.Entity.Movie.Status;
import com.example.backend.Repo.MovieRepo;
import com.example.backend.Service.MovieService;



@Service
public class MovieImpl implements MovieService{
	
	@Autowired
    private MovieRepo movieRepo;
	
	public List<Movie> searchByTitleOrDirector(String keyword) {
        return movieRepo.searchByTitleOrDirector(keyword);
    }
	
	@Value("${file.upload-dir}")
	private String uploadPath;

	@Value("${app.base-url}")
	private String baseUrl;

	@Override
	public String addMovie(MovieDTO movieDTO, MultipartFile file) throws IOException {
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

	    // 创建电影对象并保存到数据库
	    Movie movie = new Movie();
	    BeanUtils.copyProperties(movieDTO, movie);
	    movie.setCreatedTime(LocalDateTime.now());

	    // 创建完整的 URL
	    String fileUrl = baseUrl + "/img/" + fileName;  // 完整的 URL
	    movie.setImg(fileUrl);  // 保存完整的图片 URL
	    movieRepo.save(movie);

	    return "Movie added successfully!";
	}
	
	@Override
	public Movie updateMovie(Integer id, MovieDTO movieDTO, MultipartFile file) throws IOException {
	     Movie movie = movieRepo.findById(id).orElseThrow(() -> new RuntimeException("Movie not found"));

	     // 更新电影信
	     movie.setTitle(movieDTO.getTitle());
	     movie.setDescription(movieDTO.getDescription());
	     movie.setDuration(movieDTO.getDuration());
	     movie.setDate(movieDTO.getDate());
	     movie.setGenre(movieDTO.getGenre());
	     movie.setDirector(movieDTO.getDirector());
	     movie.setActor(movieDTO.getActor());
		 movie.setCreatedTime(LocalDateTime.now());

	     

	     // 处理图片
	     if (file != null && !file.isEmpty()) {
	         // 删除旧图片文件
	         if (movie.getImg() != null) {
	             String oldFileName = movie.getImg().substring(movie.getImg().lastIndexOf("/") + 1);
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
	         movie.setImg(fileUrl);
	     } else {
	         // 图片未更新时保留原图片
	         movie.setImg(movieDTO.getImg());
	     }
	     System.out.println(movieDTO.getStatus());
	     // 更新状态
	     Status status = Status.valueOf(movieDTO.getStatus());
	     
	     movie.setStatus(status);

	     // 保存并返回更新后的电影对象
	     return movieRepo.save(movie);
	 }
}
