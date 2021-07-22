
package com.nonJWT.stockexchange.model;

import org.springframework.data.jpa.repository.JpaRepository;

public interface Stockrepository extends JpaRepository<Stockexchange,Long> {

  Stockexchange findByName(String Name);

}
