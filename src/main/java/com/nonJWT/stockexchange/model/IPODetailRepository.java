package com.nonJWT.stockexchange.model;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IPODetailRepository extends JpaRepository<IPODetail, Long> {
	IPODetail findByid(Long id);

	IPODetail findByCompanyName(String string);
}

