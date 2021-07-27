import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


export default class UserNavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/upcomingipo" className="navbar-brand">
            User Landing Page
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/upcomingipo"} className="nav-link">
                IPOs
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/comparecompany"} className="nav-link">
                Compare Company
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/comparesector"} className="nav-link">
                Compare Sector
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/compare2companies"} className="nav-link">
                Compare 2 Companies
              </Link>
            </li>
          </div>
        </nav>

      </div>
    );
  }
}