package com.nonJWT.stockexchange.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "IPODetail")
@NamedQuery(name = "IpoDetail.getDate", query = "SELECT c FROM IPODetail c WHERE c.openDateTime >= :date")
public class IPODetail {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Double getPricePerShare() {
		return pricePerShare;
	}

	public void setPricePerShare(Double pricePerShare) {
		this.pricePerShare = pricePerShare;
	}

	public Long getTotalNumberOfShares() {
		return totalNumberOfShares;
	}

	public void setTotalNumberOfShares(Long totalNumberOfShares) {
		this.totalNumberOfShares = totalNumberOfShares;
	}

	public LocalDateTime getOpenDateTime() {
		return openDateTime;
	}

	public void setOpenDateTime(LocalDateTime openDateTime) {
		this.openDateTime = openDateTime;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public List<Stockexchange> getStockExchanges() {
		return stockExchanges;
	}

	public void setStockExchanges(List<Stockexchange> stockExchanges) {
		this.stockExchanges = stockExchanges;
	}

	@Column(nullable = false)
	private Double pricePerShare;

	@Column(nullable = false)
	private Long totalNumberOfShares;

	private LocalDateTime openDateTime;

	@OneToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	private Company company;
	private String companyName;

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	@ManyToMany
	@JsonIgnore
	private List<Stockexchange> stockExchanges = new ArrayList<>();

	protected IPODetail() {
	}

	public IPODetail(double pricePerShare, Long totalNumberOfShares, LocalDateTime openDateTime) {
			super();
			this.pricePerShare = pricePerShare;
			this.totalNumberOfShares = totalNumberOfShares;
			this.openDateTime = openDateTime;
}



}
