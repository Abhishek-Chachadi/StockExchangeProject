import React, { Component } from "react";
import {Link, Redirect, useHistory} from 'react-router-dom';
import LandingPage from "./LandingPage";
export default class Login extends Component {
        
    constructor(props)
    {
        super(props);
       this.EnterUser = this.EnterUser.bind(this);
        this.onChangename = this.onChangename.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
       
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.onChangeadmin = this.onChangeadmin(this);
        // this.handleChange = this.handleChange.bind(this);
        this.state = {
            username:"",
            email: "",
            password: "",
            admin:"false"
          };
    }

  


   EnterUser(){
           const {history} = this.props;
            if(this.state.username == "admin" && this.state.password == "admin")
            {
                
                
                // <Link to={"/LandingPage"} className="nav-link"> </Link>;
                
                history.push("/LandingPage");
                window.location.reload();
               // <Redirect to="/LandingPage"/>;
            }
            
         

       
    }

    

    onChangename(e){
        this.setState({
            username : e.target.value,
        })
    }

    onChangeEmail(e){
        this.setState({
            email : e.target.value,
        })
    }
    onChangePassword(e){
        this.setState({
            password : e.target.value,
        })
    }
    // onChangeadmin(e){
    //     this.setState({
    //         admin : e.target.value,
    //     })
    // }
    render() {
        
        return (
            <div>
            <form className="form-group">
               
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="name" className="form-control" value ={this.state.username} onChange={this.onChangename} placeholder="Enter Name" name="name" id = "name" required/>
                </div>

                {/* <div className="form-group">
                    <label>Email address</label>
                    <input type="text" className="form-control" value = {this.state.email}onChange = {this.onChangeEmail}placeholder="Enter email" name="email" id = "email" required/>
                </div> */}

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value= {this.state.password}onChange = {this.onChangePassword} placeholder="Enter password" name="password" id="password" required/>
                </div>
                


                <button type="submit" onClick={this.EnterUser} className="btn btn-primary btn-block">Submit</button>
            </form>
            </div>
        );
    }
}