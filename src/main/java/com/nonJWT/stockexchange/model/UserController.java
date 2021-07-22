package com.nonJWT.stockexchange.model;



import java.util.Optional;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
	@Autowired
	Users_Repository userrepo;

	@CrossOrigin(origins ="http://localhost:3000")

	@RequestMapping(value = "/setuserapi",method=RequestMethod.POST)
	
	public String Stringreactuserapi(@RequestBody Users_SE user) throws AddressException, MessagingException {	
	
		Users_SE usrsaved = userrepo.save(user);
		HttpHeaders headers = new HttpHeaders();
		headers.add("Responded", "UserController");
		headers.add("Access-Control-Allow-Origin", "*");
		sendemail(user.getId()) ;
		
		return user.toString();

	}
	public void sendemail(Long userid) throws AddressException, MessagingException {

		Users_SE user = userrepo.getById(userid);

		final String username = "chachadi555abhishek@gmail.com";
		final String password = "Currygiannis@29";

		Properties prop = new Properties();
		prop.put("mail.smtp.host", "smtp.gmail.com");
		prop.put("mail.smtp.port", "587");
		prop.put("mail.smtp.auth", "true");
		prop.put("mail.smtp.starttls.enable", "true"); // TLS

		Session session = Session.getInstance(prop, new javax.mail.Authenticator() {
			protected javax.mail.PasswordAuthentication getPasswordAuthentication() {
				return new javax.mail.PasswordAuthentication(username, password);
			}
		});

		try {

			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress("chachadi555abhishek@gmail.com"));
			// message.setRecipients(
			// Message.RecipientType.TO,
			// InternetAddress.parse("sftrainerram@gmail.com")
			// );
			message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(user.getemail()));
			message.setSubject("USer confirmation email");
			// message.setText("Dear Mail Crawler,"
			// + "\n\n Please do not spam my email!");
			message.setContent(
					"<h1><a href =\"http://127.0.0.1:8080/confirmuser/" + userid + "/\"> Click to confirm </a></h1>",
					"text/html");
			Transport.send(message);

			System.out.println("Done");

		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/confirmuser/{userid}", method = RequestMethod.GET)
	public String welcomepage(@PathVariable Long userid) {
		Optional<Users_SE> userlist = userrepo.findById(userid);
		// do a null check for home work
		Users_SE usr = new Users_SE();
		usr = userrepo.getById(userid);
		usr.setConfirmed(true);
		userrepo.save(usr);
		return "User confirmed" + usr.getname();
	}

}