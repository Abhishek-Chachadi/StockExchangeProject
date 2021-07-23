import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ManageCompany from "./ManageCompany";
import ManageExchange from "./ManageExchange";
import {Link} from 'react-router-dom';

class NavBar extends Component {
 
  render() {
    return (
    
        <nav className ="navbar">
        <ul className ="nav-links">
          <li> STOCK EXCHANGE</li>
          <Link to="/">Home</Link>
          <Link to="/managecompany"><li> Manage Company</li>
          </Link>
          <Link to="manageexchange"><li> Manage Exchange</li></Link>
          <Link to="importexcel"> <li>Import Excel</li></Link>
          <Link to="ipodetails"> <li>Update IPO Details </li></Link>
          <Link to="addcompanyexchangemap"> <li>Enter Company Exchange Name </li></Link>
          <Link to="getsectors"><li>Manage Sector</li></Link>
        </ul> 
        </nav>
    );
  }
}

export default NavBar;