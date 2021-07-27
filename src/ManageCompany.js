
import React from 'react';
import ReactDOM from 'react-dom';
import Table from 'react-bootstrap/Table';
import Service from './Service';
import { Link } from 'react-router-dom';
export default class ManageCompany extends React.Component {

    constructor(props) {
        super(props);
        this.onChangecompanyName = this.onChangecompanyName.bind(this);
        this.onChangeturnover = this.onChangeturnover.bind(this);
        this.onChangeceo = this.onChangeceo.bind(this);
        this.onChangeboardOfDirectors = this.onChangeboardOfDirectors.bind(this);
        this.onChangebriefWriteup = this.onChangebriefWriteup.bind(this);
        this.onChangesectorName = this.onChangesectorName.bind(this);
        this.savecompany = this.savecompany.bind(this);
        this.newcompany = this.newcompany.bind(this);
        this.onChangeSectorDropdown = this.onChangeSectorDropdown.bind(this);
        this.state = {
            companyName: "",
            turnover: 0,
            ceo: "",
            boardOfDirectors: "",
            companyBrief: "",
            sectorName: "",
            sectorList: [],
            submitted: false,
            companylist: [],
            selectedSector:"",
            validationError:""
        };

    }
    componentDidMount() {
        Service.getCompany().then((response => {
            this.setState({ companylist: response.data })
        }));

        Service.getSectorList().then((response => {
            console.log(response.data);
            this.setState({
                sectorList: response.data
            })
            //  let teamsFromApi = response.data.map(team => {
            //              return { value: team, display: team }
            // });
            // this.setState({
            //     sectorList: [{ value: '', display: '(Select the Sector)' }].concat(teamsFromApi)
            // });
        }));

        // fetch("http://localhost:8080/getcompanysectors")
        //     .then((response) => {
        //         return response.json();
        //     })
        //     .then(data => {
        //         let teamsFromApi = data.map(team => {
        //             return { value: team, display: team }
        //         });
        //         this.setState({
        //             sectorList:[{value: '',display: '(Select the Sector)'}].concat(teamsFromApi)
        //         });
        //     }).catch(e => console.log(e));
    }




    onChangecompanyName(e) {
        this.setState({
            companyName: e.target.value
        });
    }

    onChangeturnover(e) {
        this.setState({
            turnover: e.target.value
        });
    }
    onChangeceo(e) {
        this.setState({
            ceo: e.target.value
        });
    }
    onChangeboardOfDirectors(e) {
        this.setState({
            boardOfDirectors: e.target.value
        });
    }
    onChangebriefWriteup(e) {
        this.setState({
            companyBrief: e.target.value
        });
    }
    onChangesectorName(e) {
        this.setState({
            sectorName: e.target.value
        });
    } 
    onChangeSectorDropdown(e){
        this.setState({
            selectedSector:e.target.value,
            sectorName:e.target.value,
            validationError:e.target.value === ""?"You Must select a sector ":""});
    }

    savecompany() {
        var data = {
            companyName: this.state.companyName,
            turnover: this.state.turnover,
            ceo: this.state.ceo,
            boardOfDirectors: this.state.boardOfDirectors,
            companyBrief: this.state.companyBrief,
            sectorName: this.state.sectorName
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
        fetch('https://phase3stockexchange.herokuapp.com/company', requestOptions)
        //fetch('http://localhost:8080/company', requestOptions)
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

    newcompany() {
        this.setState({
            companyName: "",
            turnover: 0,
            ceo: "",
            boardOfDirectors: "",
            companyBrief: "",
            sectorName: "",
            submitted: false
        });
    }

    render() {



        return (
            <div>
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newcompany}>
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
                        <div className="form-group" class="col-md-6">
                            <label htmlFor="title">Turnover</label>
                            <input
                                type="number"
                                className="form-control"
                                id="turnover"
                                required
                                value={this.state.turnover}
                                onChange={this.onChangeturnover}
                                name="turnover"
                            />
                        </div>
                        <div className="form-group" class="col-md-6">
                            <label htmlFor="title">CEO</label>
                            <input
                                type="text"
                                className="form-control"
                                id="ceo"
                                required
                                value={this.state.ceo}
                                onChange={this.onChangeceo}
                                name="ceo"
                            />
                        </div>
                        <div className="form-group" class="col-md-6">
                            <label htmlFor="title">Board of Directors</label>
                            <input
                                type="text"
                                className="form-control"
                                id="boardOfDirectors"
                                required
                                value={this.state.boardOfDirectors}
                                onChange={this.onChangeboardOfDirectors}
                                name="boardOfDirectors"
                            />
                        </div>
                        <div className="form-group" class="col-md-6">
                            <label htmlFor="title">About the company</label>
                            <input
                                type="text"
                                className="form-control"
                                id="companyBrief"
                                required
                                value={this.state.briefWriteup}
                                onChange={this.onChangebriefWriteup}
                                name="companyBrief"
                            />
                        </div>
                        {/* <div className="form-group" class="col-md-6">
                            <label htmlFor="title">Sector Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="sectorName"
                                required
                                value={this.state.sectorName}
                                onChange={this.onChangesectorName}
                                name="sectorName"
                            />
                        </div> */}
                        <div>
                            <select 
                                onClick={this.onChangeSectorDropdown}>
                                {this.state.sectorList.map((sectors) => <option key={sectors.id} value={sectors.sectorName}> {sectors.sectorName} </option>)}
                                value={this.state.selectedSector}
                            </select>
                        </div>
                        <div style={{color:'red',marginTop: '5px'}}>
                            {this.state.validationError}
                            </div>


                        <button onClick={this.savecompany} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
                <div className="col-md-6">
                    <h4>Companies List</h4>
                    <ul className="list-group">
                    </ul>
                </div>
                </div>
                <div>
                    <h1 className="text-center"> Company List</h1>
                    <Table className="table table-dark table-striped table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <td>Company-ID</td>
                                <td>Company Name</td>
                                <td>Turnover</td>
                                <td>CEO</td>
                                <td>Board of Directors</td>
                                <td>Company Brief</td>
                                <td>Sector Name</td>
                                <td> Actions </td>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.companylist.map(
                                    company =>
                                        <tr key={company.id}>
                                            <td>{company.id}</td>
                                            <td>{company.companyName}</td>
                                            <td>{company.turnover}</td>
                                            <td>{company.ceo}</td>
                                            <td>{company.boardOfDirectors}</td>
                                            <td>{company.companyBrief}</td>
                                            <td>{company.sectorName}</td>
                                            <td><Link
                                                to={"/company/" + company.id}
                                                className="badge badge-warning"
                                            >
                                                Edit
                                            </Link></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
            
        );
    }
}





