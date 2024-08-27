package com.example.backend.Entity;

import java.sql.Date;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

//Concert 类是一个 JPA 实体，JPA 会将这个类映射到数据库中的表
//Spring Data JPA 可以管理这个类的实例，并将其与数据库中的记录相关联
@Entity 
@Table(name = "movies")  
public class Movie {
	@Id
    @Column(name="movie_id", length = 10)
    @GeneratedValue(strategy = GenerationType.AUTO)
 private int id;

 @Column(name = "title")
 private String title;

 @Column(name = "description")
 private String description;
 
 @Column(name = "duration")
 private int duration;

 @Column(name = "released_date")
 private Date date;
 
 @Column(name = "img")
 private String img;
 
 @Column(name = "genre")
 private String genre;
 
 @Column(name = "director")
 private String director;
 
 @Column(name = "created_time")
 private LocalDateTime createdtime;

public int getId() {
	return id;
}

public void setId(int id) {
	this.id = id;
}

public String getTitle() {
	return title;
}

public void setTitle(String title) {
	this.title = title;
}

public String getDescription() {
	return description;
}

public void setDescription(String description) {
	this.description = description;
}

public int getDuration() {
	return duration;
}

public void setDuration(int duration) {
	this.duration = duration;
}

public Date getDate() {
	return date;
}

public void setDate(Date date) {
	this.date = date;
}

public String getImg() {
	return img;
}

public void setImg(String img) {
	this.img = img;
}

public String getGenre() {
	return genre;
}

public void setGenre(String genre) {
	this.genre = genre;
}

public String getDirector() {
	return director;
}

public void setDirector(String director) {
	this.director = director;
}

public LocalDateTime getCreatedtime() {
	return createdtime;
}

public void setCreatedtime(LocalDateTime createdtime) {
	this.createdtime = createdtime;
}
 
 
}
