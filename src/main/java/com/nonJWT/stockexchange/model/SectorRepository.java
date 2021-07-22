package com.nonJWT.stockexchange.model;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SectorRepository extends JpaRepository<Sector, Long> {

	Sector findBySectorName(String sectorName);

}
