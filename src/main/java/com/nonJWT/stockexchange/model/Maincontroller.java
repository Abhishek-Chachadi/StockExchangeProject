package com.nonJWT.stockexchange.model;

import java.io.IOException;
import java.net.URI;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@CrossOrigin
@RestController
public class Maincontroller {
	@Autowired
	Companyrepository cmprep;
	@Autowired
	Stockrepository stkrep;
	@Autowired
	Companystockexchangemaprepository stkcmpmaprep;
	@Autowired
	EntityManager em;
	@Autowired
	SectorRepository sectorrepo;
	@Autowired
	IPODetailRepository iporepo;


	@RequestMapping(value = "/company", method = RequestMethod.POST)
	public ResponseEntity<Object> createcompany(@RequestBody Company cmp) {

		Sector se = sectorrepo.findBySectorName(cmp.getSectorName());
		cmp.setSector(se);

		cmprep.save(cmp);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(cmp.getId())
				.toUri();

		return ResponseEntity.created(location).build();
	}

	@RequestMapping(value = "/getcompanydetails", method = RequestMethod.POST)
	public Company getcompany(@RequestBody Company cmp) {
		Company c = cmprep.findByid(cmp.getId());
		return c;
	}

	@RequestMapping(value = "/getcompanydetailsAll", method = RequestMethod.GET)
	public List<Company> getcompanies() {
		List<Company> c = cmprep.findAll();
		return c;
	}

	@RequestMapping(value = "/Stockexchange", method = RequestMethod.POST)
	public ResponseEntity<Object> createStockexchange(@RequestBody Stockexchange cmp) {

		stkrep.save(cmp);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(cmp.getId())
				.toUri();

		return ResponseEntity.created(location).build();
	}



	@RequestMapping(value = "/mapcompanycode", method = RequestMethod.POST)
	// pass map of string in requestbody ,instead of pojo class to get
	// non entity based params
	public String mapcode(@RequestBody Map<String, String> text) {
		System.out.println("params100" + text.get("companyName"));
		Query query = em.createNamedQuery("Company.findByName");
		query.setParameter("name", text.get("companyName"));
		Company c = (Company) query.getSingleResult();

		Stockexchange e = stkrep.findByName(text.get("name"));
		Companystockexchangemap cse = new Companystockexchangemap();
		cse.setCompany(c);
		cse.setStockexchange(e);
		String companyCode = text.get("companyCode");
		cse.setCompanyCode(companyCode);
		stkcmpmaprep.save(cse);
		return "Test";
	}
	
	

	@RequestMapping(value = "/listall", method = RequestMethod.GET)	
	public String listit() {
		
		String x = "";
		List<Companystockexchangemap> csem = stkcmpmaprep.findAll();
		for (Companystockexchangemap c:csem)  {
		Optional<Stockexchange> s =	stkrep.findById(c.getStockexchange().getId()); 
		Optional<Company> cc =cmprep.findById(c.getCompany().getId());
		x = x + "   " + cc.get().getCompanyName() + "   " + s.get().getname();
		}
		
		
		
		return x;

	}

	@RequestMapping(value = "/getExchangeMapAll", method = RequestMethod.GET, headers = "Accept=application/json")
	public List<Companystockexchangemap> getCompaniesmapall() {
		List<Companystockexchangemap> lstOfCompaniesmap = stkcmpmaprep.findAll();
		System.out.println(lstOfCompaniesmap);
		return lstOfCompaniesmap;
	}

	@RequestMapping(value = "/companyinstockexchange", method = RequestMethod.POST)
	public List<Company> getcompanyinstockexchange(@RequestBody Map<String, String> text) {
		Stockexchange e = stkrep.findByName(text.get("name"));
		Query query = em.createNamedQuery("Companystockexchange.findById");
		query.setParameter("stockexchange", e);
		List<Company> id = (List<Company>) query.getResultList();
		return id;
	}

	@GetMapping("/company/{id}")
	public ResponseEntity<Company> getCompanyById(@PathVariable("id") long id) {
		Optional<Company> companyData = cmprep.findById(id);

		if (companyData.isPresent()) {
			return new ResponseEntity<>(companyData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("/company/{id}")
	public ResponseEntity<Company> updateTutorial(@PathVariable("id") long id, @RequestBody Company company) {
		Optional<Company> companyData = cmprep.findById(id);

		if (companyData.isPresent()) {
			Company _company = companyData.get();
			_company.setCompanyName(company.getCompanyName());
			_company.setTurnover(company.getTurnover());
			_company.setCeo(company.getCeo());
			_company.setBoardOfDirectors(company.getBoardOfDirectors());
			_company.setCompanyBrief(company.getCompanyBrief());
			_company.setSectorName(company.getSectorName());
			return new ResponseEntity<>(cmprep.save(_company), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/company/{id}")
	public ResponseEntity<HttpStatus> deleteTutorial(@PathVariable("id") long id) {
		try {
			cmprep.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@RequestMapping(value = "/getupcomingipodetails", method = RequestMethod.GET)
	public List<IPODetail> getUpcomingIpoDetails() throws ClassNotFoundException, IOException {
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
		LocalDateTime now = LocalDateTime.now();
		Query query = em.createNamedQuery("IpoDetail.getDate");
		query.setParameter("date", now);
		List<IPODetail> upcomingipolist = (List<IPODetail>) query.getResultList();
		// make sure your entity class properties of user are in lower case and match
		// the json,to avoid errors
		return upcomingipolist;
	}
	

	
}
