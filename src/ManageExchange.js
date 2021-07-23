import React from 'react';
import ReactDOM from 'react-dom';
import Service from './Service';
import Table from 'react-bootstrap/Table'

export default class ManageExchange extends React.Component{

    constructor(props) {
        super(props);
        this.onChangename = this.onChangename.bind(this);
        this.savestockexchange = this.savestockexchange.bind(this);
        this.newstockexchange = this.newstockexchange.bind(this);
        
        this.state = {
            name: "",
            submitted: false,
            stockexchangelist:[],
        };
    }
    
    componentDidMount(){
        Service.getStockExchanges().then((response => {
            this.setState({stockexchangelist:response.data})
        }));
    }

    onChangename(e) {
        this.setState({
            name: e.target.value
        });
    }

    savestockexchange() {
        var data = {
            name: this.state.name,
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
        fetch('http://localhost:8080/exchange', requestOptions)
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

    newstockexchange() {
        this.setState({
            name: "",
            submitted: false
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newstockexchange}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group" class="col-md-6"> 
                            <label htmlFor="title">Stock Exchange Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                required
                                value={this.state.name}
                                onChange={this.onChangename}
                                name="name"
                            />
                        </div>

                        <button onClick={this.savestockexchange} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
                <div className="col-md-6">
                    <h4>Stock Exchange List</h4>
                    <ul className="list-group">
                    </ul>
                </div>

                <div>
                <h1 className="text-center"> Exchange List</h1>
                <Table className = "table table-dark table-striped">
                    <thead>
                        <tr>
                            <td>Exchange ID</td>
                            <td>Exchange Name</td>
                        </tr>
                    </thead>
                
            <tbody>
                {
                    this.state.stockexchangelist.map(
                        stockexchange =>
                        <tr key = {stockexchange.id}>
                            <td>{stockexchange.id}</td>
                            <td>{stockexchange.name}</td>
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



