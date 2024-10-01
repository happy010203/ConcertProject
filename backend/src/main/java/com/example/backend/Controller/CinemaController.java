package com.example.backend.Controller;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.DTO.LoginDTO;
import com.example.backend.DTO.SeatDTO;
import com.example.backend.DTO.TokenDTO;
import com.example.backend.DTO.UserDTO;
import com.example.backend.Entity.Cinema;
import com.example.backend.Entity.Hall;
import com.example.backend.Entity.Movie;
import com.example.backend.Entity.News;
import com.example.backend.Entity.Role;
import com.example.backend.Entity.Showdate;
import com.example.backend.Entity.Showtime;
import com.example.backend.Entity.User;
import com.example.backend.Repo.CinemaRepo;
import com.example.backend.Repo.HallRepo;
import com.example.backend.Repo.MovieRepo;
import com.example.backend.Repo.NewsRepo;
import com.example.backend.Repo.ShowtimeRepo;
import com.example.backend.Repo.UserRepo;
import com.example.backend.Security.CustomUserDetails;
import com.example.backend.Security.CustomUserDetailsService;
import com.example.backend.Security.JwtService;
import com.example.backend.Service.MovieService;
import com.example.backend.Service.SeatService;
import com.example.backend.Service.ShowtimeService;
import com.example.backend.Service.UserService;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.json.JsonFactory;

@RestController
@RequestMapping("/api/movie")
public class CinemaController {

	@Autowired
	private MovieRepo movieRepo;

	@Autowired
	private NewsRepo newsRepo;

	@Autowired
	private CinemaRepo cinemaRepo;
	
	@Autowired
	UserRepo userRepo; 

	@Autowired
	private HallRepo hallRepo;
	
	@Autowired
    private ShowtimeRepo showtimeRepo;

	@Autowired
	private MovieService movieService;
	
	@Autowired
    private SeatService seatService;

	@Autowired
	private UserService userService;
	
	@Autowired
    private ShowtimeService showtimeService;

	@Autowired
	private JwtService jwtService;

	@Autowired
	private CustomUserDetailsService customUserDetailsService;

	/**
	 * 获取所有电影
	 * 
	 * @return 电影列表
	 */
	@GetMapping("/movies")
	public List<Movie> getMovies() {
		return movieRepo.findMoviesByStatus(Movie.Status.TRUE);
	}
	
	@GetMapping("/movies/{id}")
	 public ResponseEntity<Movie> getMovieById(@PathVariable int id) {
	     return movieRepo.findById(id)
	         .map(movie -> ResponseEntity.ok().body(movie))
	         .orElseGet(() -> ResponseEntity.notFound().build());
	 }

	@GetMapping("/news")
	public List<News> getNews() {
		return newsRepo.findAll();
	}

	@GetMapping("/cinemas")
	public ResponseEntity<List<Cinema>> getAllCinemas() {
		try {
			List<Cinema> cinemas = cinemaRepo.findAll();
			return new ResponseEntity<>(cinemas, HttpStatus.OK);
		} catch (Exception e) {
			System.err.println("Error fetching cinemas: " + e.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/halls")
	public List<Hall> getAllHalls() {
		return hallRepo.findAll();
	}

	@GetMapping("/halls/{hallId}")
	public Hall getHallById(@PathVariable("hallId") int hallId) {
		return hallRepo.findById(hallId).orElse(null);
	}
	
	@PutMapping("/save/{showtimeId}/{seatNumber}")
    public ResponseEntity<String> addSeat(@PathVariable Integer showtimeId, 
                                @PathVariable String seatNumber, 
                                @RequestBody SeatDTO seatDTO) {
        try {
            // 檢查 SeatDto 是否非空
            if (seatDTO == null) {
                return ResponseEntity.badRequest().body("SeatDto cannot be null");
            }

            // 設置 DTO 的相關資訊
            seatDTO.setShowtimeId(showtimeId);
            seatDTO.setSeatNumber(seatNumber);

            // 調用 SeatService 的 saveSeatInfo 函數來保存座位資訊，其他外鍵由後端查詢
            seatService.addSeat(seatDTO);

            // 返回成功響應
            return ResponseEntity.ok("Seat information saved successfully");

        } catch (Exception e) {
            // 捕獲並處理異常，返回 500 狀態碼和錯誤訊息
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving seat information: " + e.getMessage());
        }
    }
	
	@GetMapping("/seatsResearch/{showtimeId}/{cinemaId}/{hallId}/{showDate}")
    public ResponseEntity<List<SeatDTO>> getSeats(
            @PathVariable Integer showtimeId, 
            @PathVariable Integer cinemaId, 
            @PathVariable Integer hallId, 
            @PathVariable String showDate) {

        try {
            // 調用 service 層的方法來獲取座位信息
            List<SeatDTO> seats = seatService.getSeatsByShowtimeCinemaAndHallAndDate(showtimeId, cinemaId, hallId, showDate);

            // 返回成功響應和座位信息
            return ResponseEntity.ok(seats);

        } catch (Exception e) {
            // 捕獲並處理異常，返回 500 狀態碼和錯誤訊息
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Collections.emptyList()); // 返回空的列表，表示沒有數據
        }
    }
	
	@GetMapping("/seatsResearch/{showtimeId}")
    public ResponseEntity<List<SeatDTO>> getSeatsByShowtimeId(@PathVariable Integer showtimeId) {
        try {
            // 根據 showtimeId 查詢相關的 cinemaId, hallId 和 showDate
            List<SeatDTO> seats = seatService.getSeatsByShowtimeId(showtimeId);

            // 返回座位信息
            return ResponseEntity.ok(seats);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Collections.emptyList()); // 返回空列表表示沒有數據
        }
    }
	
	@GetMapping("/cinemas/{cinemaId}/showdates")
    public ResponseEntity<List<Showdate>> getShowdates(@PathVariable Integer cinemaId) {
        try {
            Cinema cinema = new Cinema();  // Assuming a constructor or method to fetch cinema by ID
            cinema.setCinema_id(cinemaId);

            List<Showtime> showtimes = showtimeRepo.findDistinctBycinema(cinema);
            List<Showdate> showdates = showtimes.stream()
                    .map(Showtime::getShowDate)
                    .distinct()
                    .collect(Collectors.toList());
            return ResponseEntity.ok(showdates);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/cinemas/{cinemaId}/showtimes/{showDateId}")
    public ResponseEntity<List<Showtime>> getShowtimes(@PathVariable Integer cinemaId, @PathVariable Integer showDateId) {
        try {
            Cinema cinema = new Cinema();  
            cinema.setCinema_id(cinemaId);

            Showdate showDate = new Showdate();  
            showDate.setShowdate_id(showDateId);
            
            System.out.println(showDateId);
            List<Showtime> showtimes = showtimeRepo.findByCinemaAndShowDate(cinema, showDate);
            return ResponseEntity.ok(showtimes);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
    
    //從 showtime_id 打數據至前端
    @GetMapping("/area/{showtimeId}")
    public ResponseEntity<Showtime> getShowtimeById(@PathVariable Integer showtimeId) {
        Showtime showtime = showtimeService.getShowtimeById(showtimeId);
        if (showtime != null) {
            return ResponseEntity.ok(showtime);
        } else {
            return ResponseEntity.notFound().build();
        }
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

	@PostMapping("/google-login")
	public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> request) {
        String googleToken = request.get("token");

        JsonFactory jsonFactory = GsonFactory.getDefaultInstance();
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), jsonFactory)
                .setAudience(Collections.singletonList(""))
                .build();

        try {
            GoogleIdToken idToken = verifier.verify(googleToken);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                String email = payload.getEmail();
                String name = (String) payload.get("name");

                Optional<User> optionalUser = userRepo.findByEmail(email);
                User user;
                if (optionalUser.isPresent()) {
                    user = optionalUser.get();
                } else {
                    // Create a new user if not found
                    user = new User();
                    user.setEmail(email);
                    user.setUsername(name);
                    user.setRole(Role.USER);
                    userRepo.save(user);
                }

                // Assuming userRepo returns a UserDetails object
                UserDetails userDetails = new CustomUserDetails(user);
                String jwtToken = jwtService.generateToken(userDetails);

                return ResponseEntity.ok(Map.of(
                    "token", jwtToken,
                    "email", email,
                    "roles", userDetails.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList()),
                    "name", name
                ));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid Google token"));
            }
        } catch (Exception e) {
            // 捕獲所有異常並返回詳細的錯誤訊息
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Google login error: " + e.getMessage()));
        }
        
    }
	
	@PutMapping("/update/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Integer id, @RequestBody User updatedUser) {
        Optional<User> updated = userService.updateUser(id, updatedUser);
        
        return updated.map(user -> ResponseEntity.ok(user))
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
