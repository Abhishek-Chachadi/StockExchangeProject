import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ManageCompany from "./ManageCompany";
import ManageExchange from "./ManageExchange";
import {Link} from 'react-router-dom';

class NavBar extends Component {
 
  render() {
    return (
    
      <nav className="navbar navbar-dark bg-dark">
        <ul className ="nav-links">
          <div className="navbar-nav mr-auto">
          <li className="nav-item"> STOCK EXCHANGE</li>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/managecompany" className="nav-link"><li className="nav-item"> Manage Company</li>
          </Link>
          <Link to="manageexchange" className="nav-link"><li className="nav-item"> Manage Exchange</li></Link>
          <Link to="importexcel" className="nav-link"> <li className="nav-item">Import Excel</li></Link>
          <Link to="ipodetails" className="nav-link"> <li className="nav-item">Update IPO Details </li></Link>
          <Link to="addcompanyexchangemap" className="nav-link"> <li className="nav-item">Enter Company Exchange Name </li></Link>
          <Link to="getsectors" className="nav-link"><li className="nav-item">Manage Sector</li></Link>
          </div>
        </ul> 
        </nav>
    );
  }
}

export default NavBar;