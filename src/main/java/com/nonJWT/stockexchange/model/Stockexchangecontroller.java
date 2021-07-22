package com.nonJWT.stockexchange.model;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
@CrossOrigin
@RestController
public class Stockexchangecontroller {
	@Autowired
	Stockrepository stkrep ;
	@Autowired
	Companystockexchangemaprepository cmpexcmap;

	@RequestMapping(value="/exchange",method=RequestMethod.POST)
	public ResponseEntity<Object> createexchange(@RequestBody Stockexchange exch) {

			stkrep.save(exch);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(exch.getId())
				.toUri();
			
		return ResponseEntity.created(location).build();
		}

		@RequestMapping(value = "/getstockexchange", method = RequestMethod.GET, headers = "Accept=application/json")
		public List<Stockexchange> getStockExchange() {
			List<Stockexchange> stockexchanges = stkrep.findAll();
			return stockexchanges;

		}


}
