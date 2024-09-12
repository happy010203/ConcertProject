package com.example.backend.Controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.DTO.LoginDTO;
import com.example.backend.DTO.TokenDTO;
import com.example.backend.DTO.UserDTO;
import com.example.backend.Entity.Movie;
import com.example.backend.Entity.News;
import com.example.backend.Repo.MovieRepo;
import com.example.backend.Repo.NewsRepo;
import com.example.backend.Service.CustomUserDetailsService;
import com.example.backend.Service.MovieService;
import com.example.backend.Service.UserService;

@RestController
@RequestMapping("/api/movie")
public class CinemaController {

	@Autowired
	private MovieRepo movieRepo;
	
	@Autowired
	private NewsRepo newsRepo;

	@Autowired
	private MovieService movieService;

	@Autowired
	private UserService userService;

	@Autowired
	private CustomUserDetailsService customUserDetailsService;

	/**
	 * 获取所有电影
	 * 
	 * @return 电影列表
	 */
	@GetMapping("/movies")
	public List<Movie> getMovies() {
		return movieRepo.findAll();
	}
	
	@GetMapping("/news")
	public List<News> getNews() {
		return newsRepo.findAll();
	}

	/**
	 * 根据标题或导演搜索电影
	 * 
	 * @param keyword 搜索关键字
	 * @return 电影列表
	 */
	@GetMapping("/search")
	public List<Movie> searchByTitleOrDirector(@RequestParam String keyword) {
		return movieService.searchByTitleOrDirector(keyword);
	}

	/**
	 * 用户注册
	 * 
	 * @param user 用户数据传输对象
	 * @return 响应消息
	 */
	@PostMapping("/register")
	public ResponseEntity<Map<String, String>> saveUser(@RequestBody UserDTO user) {
		Map<String, String> response = new HashMap<>();

		try {
			int savedUser = userService.saveOrUpdateUser(user);
			response.put("message", "User saved with ID: " + savedUser);
			return ResponseEntity.status(201).body(response);
		} catch (Exception e) {
			response.put("error", e.getMessage());
			return ResponseEntity.status(400).body(response); // 返回400狀態碼以表示請求錯誤
		}
	}

	/**
	 * 用户登录
	 * 
	 * @param loginDTO 登录数据传输对象
	 * @return 令牌数据传输对象
	 */
	@PostMapping("/login")
	public ResponseEntity<TokenDTO> login(@RequestBody LoginDTO loginDTO) {
		return ResponseEntity.ok(customUserDetailsService.authenticate(loginDTO));
	}
}
