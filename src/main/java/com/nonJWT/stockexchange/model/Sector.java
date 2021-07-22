package com.nonJWT.stockexchange.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@NamedQuery(name = "Sector.findByName", query = "SELECT c FROM Sector c WHERE c.sectorName = :sectorName")
//@NamedQuery(name = "Sector.getDate", query = "SELECT c FROM Sector c WHERE c.datee BETWEEN :startDate AND :endDate")
@Entity
@Table(name = "Sector")
public class Sector {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(nullable = false)
	private String sectorName;

	@Column(nullable = false)
	private String brief;

	@OneToMany(mappedBy = "sector")

	private List<Company> companies = new ArrayList<>();

	protected Sector() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSectorName() {
		return sectorName;
	}

	public void setSectorName(String sectorName) {
		this.sectorName = sectorName;
	}

	public String getBrief() {
		return brief;
	}

	public void setBrief(String brief) {
		this.brief = brief;
	}

	public List<Company> getCompanies() {
		return companies;
	}

	public void setCompanies(List<Company> companies) {
		this.companies = companies;
	}

	public Sector(String sectorName, String brief) {
		super();
		this.sectorName = sectorName;
		this.brief = brief;
	}

}
