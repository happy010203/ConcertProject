package com.example.MyJBA.entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "productForm")
public class LinePayProductForm {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "name", nullable = false) //ok
	private String name;

	@Column(name = "imageUrl", nullable = true)
	private String imageUrl;

	@Column(name = "quantity", nullable = false, precision = 38, scale = 0) //ok
	private BigDecimal quantity; 

	@Column(name = "price", nullable = false, precision = 38, scale = 0) //ok
	private BigDecimal price;

	@ManyToOne
    @JoinColumn(name = "seat_id", referencedColumnName = "seat_number")
    private SeatEntity seat;

	@ManyToOne
    @JoinColumn(name = "movie_id", referencedColumnName = "movie_id", nullable = false)
    private Movie movie;

	@ManyToOne
    @JoinColumn(name = "hall_id", referencedColumnName = "hall_id", nullable = false)
    private Halls hall;

	//getter、setter

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public BigDecimal getQuantity() {
		return quantity;
	}

	public void setQuantity(BigDecimal quantity) {
		this.quantity = quantity;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	// 將 Movie 的 quantity 轉換為 BigDecimal 並設置到 LinePayProductForm 的 quantity
    public void setQuantityFromMovie() {
        if (movie != null) {
            this.price = new BigDecimal(movie.getQuantity());
        }
    }

	public Movie getMovie() {
		return movie;
	}

	public void setMovie(Movie movie) {
		this.movie = movie;
	}

	// 將 Halls 的 price 轉換為 BigDecimal 並設置到 LinePayProductForm 的 price
    public void setPriceFromHall() {
        if (hall != null) {
            this.price = new BigDecimal(hall.getPrice());
        }
    }

	public Halls getHall() {
		return hall;
	}

	public void setHall(Halls hall) {
		this.hall = hall;
	}

	public SeatEntity getSeat() {
		return seat;
	}

	public void setSeat(SeatEntity seat) {
		this.seat = seat;
	}

}
