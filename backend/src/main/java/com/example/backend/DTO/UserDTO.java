package com.example.backend.DTO;

import java.time.LocalDateTime;

public class UserDTO {
	
    private Integer id;
    
    private String username;

    private String email;

    private String password;

    private String birthDate;

	private String gender;
	
	private String role;
	

	private LocalDateTime createdTime;
    
    public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getbirthDate() {
			return birthDate;
		}

	public void setBirthDate(String birthDate) {
			this.birthDate = birthDate;
		}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public LocalDateTime getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(LocalDateTime createdTime) {
		this.createdTime = createdTime;
	}
	

}
