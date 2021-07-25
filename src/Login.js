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
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.onChangeadmin = this.onChangeadmin(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            username:"",
            email: "",
            password: "",
            admin:"false"
          };
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.isLogin(true);

    }

    handleChange = (e) => {
        const {name,value} = e.target.value;
        this.setState({
            [name]:value
        })
    }

    EnterUser(){
        

        var data2 = {
            id: "3"
        };

        const requestOptions = {
      
           
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer my-token',
                'My-Custom-Header': 'frontend'
            },
            body : JSON.stringify(data2)
          
        };
        fetch('https://phase3stockexchange.herokuapp.com/getAdmin', requestOptions)
            .then(response => {
                this.setState({
                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
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
            <form onSubmit = {this.handleSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Name</label>
                    <input type="name" className="form-control" value ={this.state.username} onChange={this.onChangename} placeholder="Enter Name" name="name" id = "name" required/>
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="text" className="form-control" value = {this.state.email}onChange = {this.onChangeEmail}placeholder="Enter email" name="email" id = "email" required/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value= {this.state.password}onChange = {this.onChangePassword} placeholder="Enter password" name="password" id="password" required/>
                </div>
                


                <button type="submit" onClick={this.handleChange} className="btn btn-primary btn-block">Submit</button>
            </form>
        );
    }
}