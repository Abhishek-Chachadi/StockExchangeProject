import React from 'react';
import ReactDOM from 'react-dom';
import Service from './Service';
//import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table'

export default class IPODetails extends React.Component{
    constructor(props){
        super(props)
        this.onChangecompanyName = this.onChangecompanyName.bind(this);
        this.onChangepricePerShare = this.onChangepricePerShare.bind(this);
        this.onChangetotalNumberOfShares = this.onChangetotalNumberOfShares.bind(this);
        this.onChangeopenDateTime = this.onChangeopenDateTime.bind(this);
        this.saveipodetail = this.saveipodetail.bind(this);
        this.newipo = this.newipo.bind(this);
        this.onChangeCompanyDropdown = this.onChangeCompanyDropdown.bind(this);
        this.state ={
            companyName: "",
            pricePerShare: 0,
            totalNumberOfShares: 0,
            openDateTime: "",
            submitted: false,
            ipodetails:[],
            Companies:[],
            selectedCompany:""
        }
    }

    componentDidMount(){
        Service.getIpoDetailFromCompany().then((response => {
            this.setState({ipodetails:response.data})
        }));
        Service.getCompany().then((response => {
            console.log(response.data);
            this.setState({
                Companies: response.data
            })}
         ));
        }

    onChangecompanyName(e) {
        this.setState({
            companyName: e.target.value
        });
    }

    onChangepricePerShare(e) {
        this.setState({
            pricePerShare: e.target.value
        });
    }
    onChangetotalNumberOfShares(e) {
        this.setState({
            totalNumberOfShares: e.target.value
        });
    }
    onChangeopenDateTime(e) {
        this.setState({
            openDateTime: e.target.value
        });
    }


    saveipodetail() {
        var data = {
            companyName: this.state.companyName,
            pricePerShare: this.state.pricePerShare,
            totalNumberOfShares: this.state.totalNumberOfShares,
            openDateTime: this.state.openDateTime,
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
        fetch('https://phase3stockexchange.herokuapp.com/ipodetails', requestOptions)
            .then(response => response.json)
    }

    newipo() {
        this.setState({
            companyName: "",
            pricePerShare: 0,
            totalNumberOfShares: 0,
            openDateTime: "",
            remarks: "",
            submitted: false
        });
    }

    onChangeCompanyDropdown(e){
        this.setState({
            selectedCompany:e.target.value,
            companyName:e.target.value,
            //validationError:e.target.value === ""?"You Must select a sector ":""});
    });
}

    render(){
        return(
            <div>
                <div className="submit-form">
                {this.state.submitted ? (
                    <div class="col-md-6">
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newipo}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group" class="col-md-6">
                            <label htmlFor="title">Company Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="companyName"
                                required
                                value={this.state.companyName}
                                onChange={this.onChangecompanyName}
                                name="companyName"
                            />
                        </div>
                        <div>
                            <select 
                                onClick={this.onChangeCompanyDropdown}>
                                {this.state.Companies.map((Company) => <option key={Company.id} value={Company.companyName}> {Company.companyName} </option>)}
                                value={this.state.selectedCompany}
                            </select>
                        </div>

                        <div className="form-group" class="col-md-6">
                            <label htmlFor="title">Price Per Share</label>
                            <input
                                type="number"
                                className="form-control"
                                id="pricePerShare"
                                required
                                value={this.state.pricePerShare}
                                onChange={this.onChangepricePerShare}
                                name="pricePerShare"
                            />
                        </div>
                        <div className="form-group" class="col-md-6">
                            <label htmlFor="title">Total Number of Shares</label>
                            <input
                                type="number"
                                className="form-control"
                                id="totalNumberOfShares"
                                required
                                value={this.state.totalNumberOfShares}
                                onChange={this.onChangetotalNumberOfShares}
                                name="totalNumberOfShares"
                            />
                        </div>
                        <div className="form-group" class="col-md-6">
                            <label htmlFor="title">Open Date and Time</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                id="openDateTime"
                                required
                                value={this.state.openDateTime}
                                onChange={this.onChangeopenDateTime}
                                name="openDateTime"
                            />
                        </div>
                        

                        <button onClick={this.saveipodetail} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}


</div>
            <div>
                <h1 className="text-center"> IPO Details</h1>
                <Table className = "table table-dark table-striped table-hover">
                    <thead className ="thead-dark">
                        <tr>
                            <td>IPO-ID</td>
                            <td>Company Name</td>
                            <td>Open Date Time</td>
                            <td>Price Per Share</td>
                            <td>Total Number Of Sharess</td>
                        </tr>
                    </thead>
                
            <tbody>
                {
                    this.state.ipodetails.map(
                        ipodetail =>
                        <tr key = {ipodetail.id}>
                            <td>{ipodetail.id}</td>
                            <td>{ipodetail.companyName}</td>
                            <td>{ipodetail.openDateTime}</td>
                            <td>{ipodetail.pricePerShare}</td>
                            <td>{ipodetail.totalNumberOfShares}</td>
                        </tr>
                    )
                }
                </tbody>
                </Table>
            </div>
            </div>  
        )
    }
}




