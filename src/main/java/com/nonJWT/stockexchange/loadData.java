package com.nonJWT.stockexchange;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.nonJWT.stockexchange.model.Company;
import com.nonJWT.stockexchange.model.Companyrepository;
import com.nonJWT.stockexchange.model.Users_Repository;
import com.nonJWT.stockexchange.model.Users_SE;

@Configuration
public class loadData {

	private static final Logger log = LoggerFactory.getLogger(loadData.class);

	@Bean
	CommandLineRunner initDatabase(Companyrepository repository) {

		return args -> {
			log.info("Preloading " + repository.save(new Company("Bilbo Baggins", 100, "f", "f", "f")));
			log.info("Preloading " + repository.save(new Company("Frodo Baggins", 100, "g", "h", "thief")));
		};

	}

	@Bean
	CommandLineRunner initDatabase2(Users_Repository userrepo) {

		return args -> {
			log.info("Preloading " + userrepo.save(new Users_SE("admin", "admin", "admin", true)));
		};
}
}
