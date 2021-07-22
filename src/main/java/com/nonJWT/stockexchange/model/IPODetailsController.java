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
public class IPODetailsController {

	@Autowired
	IPODetailRepository iporepo;
	@Autowired
	Companyrepository comprepo;

	@RequestMapping(value = "/ipodetails", method = RequestMethod.POST)
	public ResponseEntity<Object> createstockprice(@RequestBody IPODetail cmp) {

		Company c = comprepo.findByCompanyName(cmp.getCompanyName());
		cmp.setCompany(c);
		iporepo.save(cmp);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(cmp.getId())
				.toUri();
		return ResponseEntity.created(location).build();

	}

	@RequestMapping(value = "/getipodetails", method = RequestMethod.POST)
	public IPODetail getIpo(@RequestBody IPODetail cmp) {
		IPODetail ipo = iporepo.findByCompanyName(cmp.getCompanyName());
		return ipo;

	}

	@RequestMapping(value = "/getipodetailsAll", method = RequestMethod.GET)
	public List<IPODetail> getIpo2() {
		List<IPODetail> ipo = iporepo.findAll();
		return ipo;

	}
}
