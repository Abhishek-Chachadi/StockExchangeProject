import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ManageCompany from './ManageCompany'
import ManageExchange from './ManageExchange';
import IPODetails from './IPODetails';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './NavBar';
import LandingPage from './LandingPage';
import UserLandingPage from './UserLandingPage.js';
import FusionChart from './FusionChart';
import LoginPage from './LoginPage';
import FusionChharts from './FusionChharts';
import CompareCompany from './CompareCompany';

ReactDOM.render(
  <React.StrictMode>
    {/* <LoginPage/> */}

    <LandingPage/>
    {/* <UserLandingPage/> */}
    {/* <FusionChart/> */}
    {/* <FusionChharts/> */}
    {/* <CompareCompany/> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

