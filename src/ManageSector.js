import React from 'react';
import ReactDOM from 'react-dom';
import Service from './Service';
import Table from 'react-bootstrap/Table'

export default class ManageExchange extends React.Component{

    constructor(props) {
        super(props);
        this.onChangename = this.onChangename.bind(this);
        this.savesector = this.savesector.bind(this);
        this.newsector = this.newsector.bind(this);
        this.onChangebrief = this.onChangebrief.bind(this);
        
        this.state = {
            sectorName: "",
            brief:"",
            submitted: false,
            sectorlist:[],
        };
    }
    
    componentDidMount(){
        Service.getSectorList().then((response => {
            this.setState({sectorlist:response.data})
        }));
    }

    onChangename(e) {
        this.setState({
            sectorName: e.target.value
        });
    }
    onChangebrief(e){
        this.setState({
            brief:e.target.value
        })
    }

    savesector() {
        var data = {
            sectorName: this.state.sectorName,
            brief:this.state.brief,
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
        fetch('http://localhost:8080/sector', requestOptions)
            .then(response => {
                this.setState({
                    submitted:true
                });
                console.log(response.data);
            })
            .catch(e=> {
                console.log(e);
            });
    }

    newsector() {
        this.setState({
            sectorName: "",
            brief:"",
            submitted: false
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newsector}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group" class="col-md-6"> 
                            <label htmlFor="title">Sector Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="sectorName"
                                required
                                value={this.state.sectorName}
                                onChange={this.onChangename}
                                name="sectorName"
                            />
                        </div>
                        <div className="form-group" class="col-md-6"> 
                            <label htmlFor="title">Sector Brief</label>
                            <input
                                type="text"
                                className="form-control"
                                id="brief"
                                required
                                value={this.state.brief}
                                onChange={this.onChangebrief}
                                name="brief"
                            />
                        </div>

                        <button onClick={this.savesector} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
                <div className="col-md-6">
                    <h4>Sector List</h4>
                    <ul className="list-group">
                    </ul>
                </div>

                <div>
                <h1 className="text-center">Sector List</h1>
                <Table className = "table table-dark table-striped">
                    <thead>
                        <tr>
                            <td>Sector ID</td>
                            <td>Sector Name</td>
                            <td>Sector Brief</td>
                        </tr>
                    </thead>
                
            <tbody>
                {
                    this.state.sectorlist.map(
                        stockexchange =>
                        <tr key = {stockexchange.id}>
                            <td>{stockexchange.id}</td>
                            <td>{stockexchange.sectorName}</td>
                            <td>{stockexchange.brief}</td>
                        </tr>
                    )
                }
                </tbody>
                </Table>
            </div>
            </div>

        );
    }

    // render(){
    //     return <h1>List of Stock Exchanges</h1>;
    // }

}


