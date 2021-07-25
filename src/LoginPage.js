import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./Login";
import SignUp from "./SignUp";
import LandingPage from './LandingPage';
import UserLandingPage from './UserLandingPage';
class LoginPage extends React.Component {
  constructor(props){
    super(props);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      isLog:false
    }

  }

  
  handleLogin = (isLog)=>this.setState({isLog:this.state.isLog})
  render(){
    return (<Router>
      <div className="new-login">
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}>Stock Market Charting</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
  
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path='/' component={Login} />
              <Route path="/sign-in" render = {() =><Login isLogin={this.handleLogin}/>} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/LandingPage" component = {LandingPage}/>
              <Route path="/UserLandingPage" component = {UserLandingPage}/>
            </Switch>
          </div>
        </div>
      </div></Router>
    );
  }
  
}

export default LoginPage;