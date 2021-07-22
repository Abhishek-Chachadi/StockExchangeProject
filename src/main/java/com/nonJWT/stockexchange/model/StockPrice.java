package com.nonJWT.stockexchange.model;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@NamedQuery(name = "StockPrice.getDate", query = "SELECT c FROM StockPrice c WHERE c.datee BETWEEN :startDate AND :endDate")
@Entity
@Table(name = "StockPrice")
public class StockPrice {

	@Id
	@GeneratedValue
	private long id;
	private String exchangename;

	public String getCompanyCode() {
		return companyCode;
	}

	public void setCompanyCode(String companyCode) {
		this.companyCode = companyCode;
	}

	private String companyCode;
	private LocalDateTime localdatetime;
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	private Company company;
	private LocalDate datee;
	private Time timee;
	private float shareprice;

	public long getId() {
		return id;
	}

	public LocalDateTime getLocaldatetime() {
		return localdatetime;
	}


	public void setLocaldatetime(LocalDateTime localdatetime) {
		this.localdatetime = localdatetime;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public LocalDate getDatee() {
		return datee;
	}

	public void setDatee(LocalDate datee) {
		this.datee = datee;
	}

	public Time getTimee() {
		return timee;
	}

	public void setTimee(Time timee) {
		this.timee = timee;
	}

	public float getShareprice() {
		return shareprice;
	}

	public void setShareprice(float shareprice) {
		this.shareprice = shareprice;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getExchangename() {
		return exchangename;
	}

	public void setExchangename(String exchangename) {
		this.exchangename = exchangename;
	}


	public StockPrice( String exchangename, String companycode,  
			LocalDate datee, Time timee, float shareprice, LocalDateTime localdatetime, Company company) {
		super();
	
		this.exchangename = exchangename;
		this.companyCode = companycode;
		this.localdatetime = localdatetime;
		this.company = company;
		this.datee = datee;
		this.timee= timee;
		this.shareprice = shareprice;
	}

	public StockPrice() {
		super();
	}


}