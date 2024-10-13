package com.example.backend.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "LinePayRedirectUrls")
public class LinePayRedirectUrls {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "confirmUrl", nullable = true)
    private String confirmUrl;

	@Column(name = "cancelUrl", nullable = true)
	private String cancelUrl;
	
}
