package com.nonJWT.stockexchange.model;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface Companyrepository  extends JpaRepository<Company,Long> {
   Company  findByName(String Name);
	// Company findByCompany(Company company);
	Company findByid(Long id);

	Company findByCompanyName(String companyName);

	List<Company> findBySectorName(String sectorName);


}
