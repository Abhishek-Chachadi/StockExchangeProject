package com.nonJWT.stockexchange.model;



import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "StockExchange")
public class Stockexchange {
	

	@Id
	@GeneratedValue
	private long id;
	private String name;
	@OneToMany(targetEntity = Companystockexchangemap.class)

	private List<Companystockexchangemap> compstockmap;
	public Stockexchange() {
		super();
		
		// TODO Auto-generated constructor stub
	}
	public Stockexchange(String name) {
		super();
		this.name = name;
		// TODO Auto-generated constructor stub
	}
	public List<Companystockexchangemap> getCompstockmap() {
		return compstockmap;
	}

	public void setCompstockmap(List<Companystockexchangemap> compstockmap) {
		this.compstockmap = compstockmap;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getname() {
		return name;
	}

	public void setname(String name) {
		this.name = name;
	}

}
