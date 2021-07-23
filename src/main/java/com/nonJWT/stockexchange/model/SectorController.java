package com.nonJWT.stockexchange.model;

import java.net.URI;
import java.util.List;

import javax.persistence.EntityManager;

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
public class SectorController {

	@Autowired
	SectorRepository sectorrepo;
	@Autowired
	Companyrepository cmprepo;
	@Autowired
	EntityManager em;

	@RequestMapping(value = "/sector", method = RequestMethod.POST)
	public ResponseEntity<Object> createstockprice(@RequestBody Sector cmp) {

		sectorrepo.save(cmp);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(cmp.getId())
				.toUri();

		return ResponseEntity.created(location).build();
	}

	@RequestMapping(value = "/getcompanysector", method = RequestMethod.POST)
	public List<Company> getCompaniesusingsector(@RequestBody Company cmp) {
		List<Company> lstOfCompanies = cmprepo.findBySectorName(cmp.getSectorName());

		return lstOfCompanies;

	}

	@RequestMapping(value = "/getcompanysectors", method = RequestMethod.GET)
	public List<Sector> getCompaniesusingsectors() {
		List<Sector> lstOfCompanies = sectorrepo.findAll();
		return lstOfCompanies;

	}
	/*
	 * List<Company> getDataFromDB2(String sectorName, LocalDate localDate,
	 * LocalDate localDate2) { Query query = em.createNamedQuery("Sector.getDate");
	 * query.setParameter("startDate", localDate); query.setParameter("endDate",
	 * localDate2); List<Company> stock = (List<Company>) query.getResultList();
	 * List<Company> filteredStock = new ArrayList<>(); for (Company s : stock) { if
	 * (s.getSectorName().equals(sectorName)) { filteredStock.add(s); } } return
	 * filteredStock; } // Map<String, List<Company>>
	 * 
	 * @RequestMapping(value = "/getCompaniesByStockexchange", method =
	 * RequestMethod.POST) public List<Company> getSingleCompany(@RequestBody
	 * Map<String, String> text) { // company name, stock exchange, from and to 1,
	 * from and to 2 Company c = cmprepo.findByCompanyName(text.get("sectorName"));
	 * Query query = em.createNamedQuery("Company.findBySectorName");
	 * query.setParameter("company", c); String cCode = (String)
	 * query.getSingleResult(); List<Company> period1 =
	 * getDataFromDB2(text.get("sectorName"), LocalDate.parse(text.get("from1")),
	 * LocalDate.parse(text.get("to1"))); List<Company> period2 =
	 * getDataFromDB2(text.get("sectorName"), LocalDate.parse(text.get("from2")),
	 * LocalDate.parse(text.get("to2"))); //Map<String, List<Company>> map = new
	 * HashMap<>(); //map.put("firstList", period1); //map.put("secondList",
	 * period2); //return map; return period1; }
	 */


}
