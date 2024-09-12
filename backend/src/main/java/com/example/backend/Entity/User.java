package com.example.backend.Entity;

import java.time.LocalDateTime;
import java.util.Date;

import jakarta.persistence.Column;
import com.example.backend.Entity.Role;
import com.example.backend.Entity.Gender;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer user_id;

	@Column(name = "username", nullable = false, length = 255)
    private String username;

    @Column(name = "email", nullable = false, length = 255)
    private String email;

    @Column(name = "password", nullable = false, length = 255)
    private String password;

    @Column(name = "birth_date", nullable = false)
    private Date birthDate;

	@Column(name = "gender", nullable = false)
    @Enumerated(EnumType.STRING)
    private Gender gender;
	
	@Column(name = "role", nullable = false)
    @Enumerated(EnumType.STRING)
	 private Role role;

    @Column(name = "created_time")
    private LocalDateTime createdTime;

   
	
    @PrePersist
    protected void onCreate() {
        if (role == null) {
            role = Role.USER;
        }
        if (createdTime == null) {
            createdTime = LocalDateTime.now();
        }
    }
	public Integer getUser_id() {
		return user_id;
	}

	public void setUser_id(Integer user_id) {
		this.user_id = user_id;
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

    public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }
    
    public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public LocalDateTime getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(LocalDateTime createdTime) {
		this.createdTime = createdTime;
	}
}

