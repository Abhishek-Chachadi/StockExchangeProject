import React, { Component } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import UpcomingIPO from "./UpcomingIPO";
import CompareCompany from "./CompareCompany";
import CompareSector from "./CompareSector";
import UserNavBar from "./UserNavBar";
import Compare2Companies from "./Compare2Companies";
export default class UserLandingPage extends Component {
  render() {
    return (
      <div>

        <div className="container mt-3">
        <BrowserRouter>
            <UserNavBar/>
            
               <Switch>
            <Route exact path="/upcomingipo" component={UpcomingIPO} />
            <Route exact path="/comparecompany" component={CompareCompany} />
            <Route exact path ="/compare2companies" component={Compare2Companies}/>
            <Route exact path="/comparesector" component={CompareSector} />
               </Switch>
            </BrowserRouter>
          
        </div>
      </div>
    );
  }
}

