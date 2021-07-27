package com.nonJWT.stockexchange.model;



import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@NamedQuery(name = "Companystockexchange.findById", query = "SELECT company FROM Companystockexchangemap c WHERE c.stockexchange=:stockexchange")
@NamedQuery(name = "Companystockexchange.findBycompanyCode", query = "SELECT companyCode FROM Companystockexchangemap c WHERE c.stockexchange=:stockexchange AND c.company=:company")
@Entity
@Table(name = "CompanyStockexchangemap")

public class Companystockexchangemap {
	public Companystockexchangemap() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Id
	@GeneratedValue
	private long id;
	public String getCompanyCode() {
		return companyCode;
	}

	public void setCompanyCode(String companyCode) {
		this.companyCode = companyCode;
	}

	private String companyCode;
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Company company;
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Stockexchange stockexchange;

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public Stockexchange getStockexchange() {
		return stockexchange;
	}

	public void setStockexchange(Stockexchange stockexchange) {
		this.stockexchange = stockexchange;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
}

