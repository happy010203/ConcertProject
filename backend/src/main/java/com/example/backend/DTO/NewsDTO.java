package com.example.backend.DTO;

import java.time.LocalDateTime;

public class NewsDTO {
	
	private int id;
	
	private String img;
	
	private String text;
	
	private LocalDateTime createdTime;

	public int getId() {
		return id;
	}

	public String getImg() {
		return img;
	}

	public String getText() {
		return text;
	}

	public LocalDateTime getCreatedTime() {
		return createdTime;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public void setText(String text) {
		this.text = text;
	}

	public void setCreatedTime(LocalDateTime createdTime) {
		this.createdTime = createdTime;
	}
}
