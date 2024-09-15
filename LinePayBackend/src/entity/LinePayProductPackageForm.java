package com.example.MyJBA.entity;

import java.math.BigDecimal;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "productPackageForm")
public class LinePayProductPackageForm {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "amount", nullable = false, precision = 38, scale = 0)
	private BigDecimal amount; 
	
	@OneToMany(cascade = CascadeType.ALL)
	@Column(name = "products", nullable = false)
	private List<LinePayProductForm> products;

	@ManyToOne
    @JoinColumn(name = "movie_id", referencedColumnName = "movie_id", nullable = false)
    private Movie movie;

	@ManyToOne
	@JoinColumn(name = "hall_id", referencedColumnName = "hall_id", nullable = false)
	private Halls hall;

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

	public BigDecimal getAmount() {
        if (movie != null && hall != null) {
            BigDecimal movieQuantity = BigDecimal.valueOf(movie.getQuantity());
            BigDecimal hallPrice = BigDecimal.valueOf(hall.getPrice());
            return movieQuantity.multiply(hallPrice);
        }
        // 如果關聯不存在，則返回預設值或拋出異常
        return BigDecimal.ZERO;
    }

	// 計算 amount
	public void setAmount() {
		if (movie != null && hall != null) {
			BigDecimal movieQuantity = BigDecimal.valueOf(movie.getQuantity());
			BigDecimal hallPrice = BigDecimal.valueOf(hall.getPrice());
			this.amount = movieQuantity.multiply(hallPrice);
		}
	}

	public List<LinePayProductForm> getProducts() {
		return products;
	}

	public void setProducts(List<LinePayProductForm> products) {
		this.products = products;
	}

	public Movie getMovie() {
		return movie;
	}

	public void setMovie(Movie movie) {
		this.movie = movie;
	}

	public Halls getHall() {
		return hall;
	}

	public void setHall(Halls hall) {
		this.hall = hall;
	}

}
