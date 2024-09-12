package com.example.backend.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.DTO.MovieDTO;
import com.example.backend.DTO.NewsDTO;
import com.example.backend.Entity.Movie;
import com.example.backend.Entity.Ticket;
import com.example.backend.Entity.User;
import com.example.backend.Repo.TicketRepo;
import com.example.backend.Repo.UserRepo;
import com.example.backend.Service.MovieService;
import com.example.backend.Service.NewsService;
import com.example.backend.Service.UserService;

import java.io.IOException;

@RestController
@RequestMapping("api/admin")
public class AdminController {

    @Autowired
    private TicketRepo ticketRepo;
    
    @Autowired
    private UserRepo userRepo;
    
    @Autowired
    private NewsService newsService;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private  MovieService movieService;

    /**
     * 获取所有票务
     * @return 票务列表
     */
    @GetMapping("/tickets")
    public ResponseEntity<List<Ticket>> getTickets() {
        List<Ticket> tickets = ticketRepo.findAll();
        return ResponseEntity.ok(tickets);
    }

    /**
     * 获取所有用户
     * @return 用户列表
     */
    @GetMapping("/getusers")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    
    @PostMapping("/add-movie")
    public ResponseEntity<String> addMovie (
    		@ModelAttribute MovieDTO movieDTO,
            @RequestParam("file") MultipartFile file) throws java.io.IOException {
        try {
            String response = movieService.addMovie(movieDTO, file);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error occurred while saving the movie.");
        }
    }
    
    @PutMapping("/{id}/role")
    public User updateUserRole(@PathVariable Integer id, @RequestParam String role) {
        return userService.updateUserRole(id, role);
    }
    
    @PutMapping("/movie/{id}/update")
    public ResponseEntity<Movie> updateMovie(
        @PathVariable Integer id,
        @ModelAttribute MovieDTO movieDTO, 
        @RequestParam(required = false) MultipartFile file) throws IOException {
        Movie updatedMovie = movieService.updateMovie(id, movieDTO, file);
        
        return ResponseEntity.ok(updatedMovie);
    }
    
    @GetMapping("/search-user")
    public Optional<User> findByUsername(String username) {
		return userRepo.findByUsername(username);
	}
    
    @PostMapping("/add-news")
    public ResponseEntity<String> addNews (
    		@ModelAttribute NewsDTO newsDTO,
            @RequestParam("file") MultipartFile file) throws IOException {
        try {
            String response = newsService.addNews(newsDTO, file);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error occurred while saving the news.");
        }
    }
	
	@PostMapping("/{id}/delete-news")
	public ResponseEntity<String> deletedbyId(@PathVariable int id,NewsDTO newsDTO) {
		String response = newsService.deletedById(id, newsDTO);
        return ResponseEntity.ok(response);
	}
}

