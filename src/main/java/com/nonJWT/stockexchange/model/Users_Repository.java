package com.nonJWT.stockexchange.model;

import org.springframework.data.jpa.repository.JpaRepository;

public interface Users_Repository extends JpaRepository<Users_SE, Long> {

	Users_SE findByid(long id);

	Users_SE findByname(String username);

}
