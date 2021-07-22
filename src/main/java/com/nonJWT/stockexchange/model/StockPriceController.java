package com.nonJWT.stockexchange.model;

import java.io.IOException;
import java.net.URI;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.Query;

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
public class StockPriceController {

	@Autowired
	StockPriceRepository stockrepo;
	@Autowired
	Stockrepository stockRepo;
	@Autowired
	Companystockexchangemaprepository cmpstockexcrepo;
	@Autowired
	Companyrepository cmprepo;
	@Autowired
	EntityManager em;

	@RequestMapping(value = "/addstockprices", method = RequestMethod.POST)
	public ResponseEntity<Object> createstockprice(@RequestBody StockPrice cmp) {
		Companystockexchangemap spc = cmpstockexcrepo.findByCompanyCode(cmp.getCompanyCode());
		Company comp = cmprepo.findByid(spc.getCompany().getId());
		cmp.setCompany(comp);
		System.out.println("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");


		stockrepo.save(cmp);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(cmp.getId())
				.toUri();

		return ResponseEntity.created(location).build();
	}

	@RequestMapping(value = "/getstockprices", method = RequestMethod.GET,headers = "Accept=application/json")
	public List<StockPrice> getstockprice() throws ClassNotFoundException,
	  IOException {
	 
	  List<StockPrice> stkprice = stockrepo.findAll();
     return stkprice; 

	}

	List<StockPrice> getDataFromDB(String code, String exchange, LocalDate localDate, LocalDate localDate2) {
		Query query = em.createNamedQuery("StockPrice.getDate");
		query.setParameter("startDate", localDate);
		query.setParameter("endDate", localDate2);
		List<StockPrice> stock = (List<StockPrice>) query.getResultList();
		List<StockPrice> filteredStock = new ArrayList<>();
		for (StockPrice s : stock) {
			if (s.getCompanyCode().equals(code) && s.getExchangename().equals(exchange)) {
				filteredStock.add(s);
			}
		}
		return filteredStock;
	}

	@RequestMapping(value = "/getsinglecompany", method = RequestMethod.POST)
	public Map<String, List<StockPrice>> getSingleCompany(@RequestBody Map<String, String> text) {
		// company name, stock exchange, from and to 1, from and to 2
		Stockexchange e = stockRepo.findByName(text.get("name"));
		Company c = cmprepo.findByCompanyName(text.get("companyName"));
		Query query = em.createNamedQuery("Companystockexchange.findBycompanyCode");
		query.setParameter("stockexchange", e);
		query.setParameter("company", c);
		String cCode = (String) query.getSingleResult();
		List<StockPrice> period1 = getDataFromDB(cCode, text.get("name"), LocalDate.parse(text.get("from1")),
				LocalDate.parse(text.get("to1")));
		List<StockPrice> period2 = getDataFromDB(cCode, text.get("name"), LocalDate.parse(text.get("from2")),
				LocalDate.parse(text.get("to2")));
		Map<String, List<StockPrice>> map = new HashMap<>();
		map.put("firstList", period1);
		map.put("secondList", period2);
		return map;
	}


}
/*
 * @RestController
 * 
 * @CrossOrigin public class StockPriceController {
 * 
 * @Autowired StockPriceRepository stkpricerepo; /* { "exchangename": "bse",
 * "companycode": "TCS",
 * 
 * "datee ": "2014-01-01T23:28:56.782Z", "timee" :"10:20:00" } expected json
 * format
 */

//@CrossOrigin(origins ="http://reactive01.herokuapp.com")
//@CrossOrigin(origins ="http://localhost:3000")
/*
 * @RequestMapping(value = "/addstockprices", method = RequestMethod.POST)
 * 
 * public ResponseEntity<Object> stockpriceapi(@RequestBody StockPrice
 * stockprice) throws ClassNotFoundException, IOException {
 * 
 * StockPrice stkprice = stkpricerepo.save(stockprice); // make sure your entity
 * class properties of price are in lower case and match // the json,to avoid
 * errors System.out.println(stkprice + "check this " +
 * stkprice.getCompanyCode());
 * 
 * URI location =
 * ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand
 * (stkprice.getId()) .toUri();
 * 
 * return ResponseEntity.created(location).build(); }
 * 
 * //@CrossOrigin(origins ="http://localhost:3000")
 * 
 * @RequestMapping(value = "/getstockprices", method = RequestMethod.GET,
 * headers = "Accept=application/json")
 * 
 * public List<StockPrice> getstockprice() throws ClassNotFoundException,
 * IOException {
 * 
 * List<StockPrice> stkprice = stkpricerepo.findAll(); // make sure your entity
 * class properties of user are in lower case and match // the json,to avoid
 * errors return stkprice; } }
 */
