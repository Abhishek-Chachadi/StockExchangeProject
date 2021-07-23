import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ManageCompany from './ManageCompany'
import ManageExchange from './ManageExchange';
import IPODetails from './IPODetails';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './NavBar';
import CompanyexchangeMap from './CompanyexchangeMap';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import CompanyUpdate from './CompanyUpdate';
function LandingPage()
{
    return(
        <Router>
        <div className = "LandingPage"> 
        <NavBar/>
        <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/managecompany" component={ManageCompany}/>
        <Route path="/manageexchange" component={ManageExchange}/>
        <Route path="/importexcel" component={App}/>
        <Route path="/ipodetails" component={IPODetails}/>
        <Route path="/addcompanyexchangemap" component={CompanyexchangeMap}/>
        <Route path="/company/:id" component={CompanyUpdate}/>
        </Switch>
        </div>
        </Router>
    )
}

const Home =() => (
    <div>
        <h1><center>Welcome to Stock Exchange</center></h1>
    </div>
);
export default LandingPage;