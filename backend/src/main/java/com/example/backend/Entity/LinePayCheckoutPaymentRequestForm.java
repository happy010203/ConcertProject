package com.example.backend.Entity;

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
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "LinePayCheckoutPaymentRequestForm")
public class LinePayCheckoutPaymentRequestForm {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "amount", nullable = false, precision = 38, scale = 0)
	private BigDecimal amount; 
	
	@Column(name = "currency", nullable = false)
	private String currency; 

	@Column(name = "orderId", nullable = false)
	private String orderId;
	
	@OneToMany(cascade = CascadeType.ALL)
	@Column(name = "line_pay_product_packages", nullable = false)
	private List<LinePayProductPackageForm> packages; 

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "line_pay_redirect_urls", referencedColumnName = "id", nullable = false) // 外鍵指向 RedirectUrls 的主鍵 id
    private LinePayRedirectUrls redirectUrls;

		// @ManyToOne
    // @JoinColumn(name = "movie_id", referencedColumnName = "movie_id", nullable = false)
    // private Movie movie;

	// @ManyToOne
	// @JoinColumn(name = "hall_id", referencedColumnName = "hall_id", nullable = false)
	// private Halls hall;
	
    // public BigDecimal getAmount() {
    //     if (movie != null && hall != null) {
    //         BigDecimal movieQuantity = BigDecimal.valueOf(movie.getQuantity());
    //         BigDecimal hallPrice = BigDecimal.valueOf(hall.getPrice());
    //         return movieQuantity.multiply(hallPrice);
    //     }
    //     // 如果關聯不存在，則返回預設值或拋出異常
    //     return BigDecimal.ZERO;
    // }

	// // 計算 amount
	// public void setAmount() {
	// 	if (movie != null && hall != null) {
	// 		BigDecimal movieQuantity = BigDecimal.valueOf(movie.getQuantity());
	// 		BigDecimal hallPrice = BigDecimal.valueOf(hall.getPrice());
	// 		this.amount = movieQuantity.multiply(hallPrice);
	// 	}
	// }
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public List<LinePayProductPackageForm> getPackages() {
		return packages;
	}

	public void setPackages(List<LinePayProductPackageForm> packages) {
		this.packages = packages;
	}

	public LinePayRedirectUrls getRedirectUrls() {
		return redirectUrls;
	}

	public void setRedirectUrls(LinePayRedirectUrls redirectUrls) {
		this.redirectUrls = redirectUrls;
	}
	
}
