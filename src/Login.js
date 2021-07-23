import React, { Component } from "react";
import {Link} from 'react-router-dom';
export default class Login extends Component {
        
    constructor(props)
    {
        super(props);
        this.EnterUser = this.EnterUser.bind(this);
        this.onChangename = this.onChangename.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeadmin = this.onChangeadmin(this);

        this.state = {
            username:"",
            email: "",
            password: "",
            admin:"false"
          };
    }

    EnterUser(){
        
        if(this.state.email == "admin" && this.state.password == "admin" && this.state.username == "admin" )
        {
            return(true);
        }
        else
        return(false);

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
    onChangeadmin(e){
        this.setState({
            admin : e.target.value,
        })
    }
    render() {
        return (
            <form>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Name</label>
                    <input type="name" className="form-control" placeholder="Enter Name" name="name" id = "name"/>
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="text" className="form-control" placeholder="Enter email" name="email" id = "email"/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name="password" id="password"/>
                </div>


                <button type="submit" onClick={this.EnterUser} className="btn btn-primary btn-block">Submit</button>
            </form>
        );
    }
}