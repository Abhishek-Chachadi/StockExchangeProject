

package com.nonJWT.stockexchange.model;

import org.springframework.data.jpa.repository.JpaRepository;

public interface Companystockexchangemaprepository  extends JpaRepository<Companystockexchangemap,Long> {

	Companystockexchangemap findByCompanyCode(String companyCode);

	// Stockexchange findByName(String string);

}