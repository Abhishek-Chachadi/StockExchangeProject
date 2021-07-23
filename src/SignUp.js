import { Button } from "bootstrap";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.savesignupdetails = this.savesignupdetails.bind(this);
        this.newsignup = this.newsignup.bind(this);
        this.state = {
            name: "",
            email: "",
            password: "",
            submitted: false,
        };
    }

    Changename(e) {
        this.setState({
            name: e.target.value
        });
    }
    Changeemail(e) {
        this.setState({
            email: e.target.value
        })
    }
    Changepassword(e) {
        this.setState({
            password: e.target.value
        })
    }



    savesignupdetails() {
        var data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            admin: false
        };
        console.log(JSON.stringify(data));
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer my-token',
                'My-Custom-Header': 'frontend'
            },
            body: JSON.stringify(data)
        };
        fetch('http://localhost:8080/setuserapi', requestOptions)
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

    newsignup() {
        this.setState({
            name: "",
            email: "",
            password: "",
            submitted: false,
        });
    }

    render() {
        return (
            <div>
                <div className="submit-form">
                    {this.state.submitted ? (
                        <div>
                            <h4>Please Confirm your mail before logging in</h4>
                            <button className="btn btn-success">
                            <Link
                                to={"/sign-in"}
                            >
                                Login
                            </Link>
                            </button>
                        </div>
                    ) : (
                        <div>
                            

                            <div className="form-group">
                                <label htmlFor="title">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    required
                                    value={this.state.name}
                                    onChange={this.Changename.bind(this)}
                                    name="name"
                                    placeholder="Name"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="title">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    required
                                    value={this.state.email}
                                    onChange={this.Changeemail.bind(this)}
                                    name="email"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    required
                                    value={this.state.password}
                                    onChange={this.Changepassword.bind(this)}
                                    name="password"
                                    placeholder="Enter your password"
                                />
                            </div>

                            <button type="submit" onClick={this.savesignupdetails} className="btn btn-primary btn-block">Sign Up</button>
                            <p className="forgot-password text-right">
                                Already registered <a href="/sign-in">sign in?</a>
                            </p>
                        </div>
                    )}
                </div>

            </div>

        );
    }
}