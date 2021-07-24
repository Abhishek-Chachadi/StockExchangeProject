import React, { Component } from 'react';

import './App.css';
import ReactDOM from 'react-dom';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';


import { Switch, HashRouter, Router, Route, Link } from "react-router-dom";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);


let chartConfigs = {
    type: 'column2d',// The chart type
    width: '700', // Width of the chart
    height: '400', // Height of the chart
    dataFormat: 'json', // Data type
    dataSource: {
        // Chart Configuration
        "chart": {
            "caption": "Stock Price",
            "xAxisName": "Date",
            "yAxisName": "Share Price",
            "theme": "fusion",
        },
        // Chart Data
        "data": []
    },
};

class CompareCompany extends Component {

    constructor(props) {

        super(props);
        this.state = {
            companyName: "",
            name: "",
            from1: "",
            to1: "",
        };
        this.state = chartConfigs;

        this.dosearch = this.dosearch.bind(this);

    }
    onChangecompanyName(e) {
        this.setState({
            companyName: e.target.value
        });
    }

    onChangename(e) {
        this.setState({
            name: e.target.value
        });
    }
    onChangefrom1(e) {
        this.setState({
            from1: e.target.value
        });
    }
    onChangeto1(e) {
        this.setState({
            to1: e.target.value
        });
    }


    dosearch() {
        var data2send = {
            name: this.state.name,
            companyName: this.state.companyName,
            from1: this.state.from1,
            to1: this.state.to1
        }
        const myInit1 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Vary': 'Origin'
            },
            body: JSON.stringify(data2send)

        };
        //let searchval = this.refs.searchInput.value;//get node value or text value
        //console.log(searchval);
        let data = [];
        let endpoint = 'http://127.0.0.1:8080/getonecompany';
        //you need to give end slash ony if you call from rest endpint
        fetch(endpoint, myInit1)

            .then(response => {


                return response.json();
            })
            .then(response => {
                console.log(response);//real print of array


                var prevDs = Object.assign({}, this.state.dataSource);
                console.log(prevDs);
                response.forEach((value, key) => {
                    //		data[key] = {
                    prevDs.data[key] = {

                        'label': response[key].datee,
                        'value': response[key].shareprice
                    };


                    this.setState({
                        dataSource: prevDs,
                    });

                    console.log('data' + JSON.stringify(data));



                });
                console.log('this.' + data);
                console.log('chart' + JSON.stringify(chartConfigs));


            })//endo of .then line 53				

    }




    render() {
        return (
            <div className="App">



                <div className="input-group">
                <div className="form-group">
                        <label htmlFor="title">Company Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="companyName"
                            required
                            value={this.state.companyName}
                            onChange={this.onChangecompanyName.bind(this)}
                            name="companyName"
                        />
                    </div>
                    <div className="form-group">
                                <label htmlFor="title">Exchange Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    required
                                    value={this.state.name}
                                    onChange={this.onChangename.bind(this)}
                                    name="name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">From</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="from1"
                                    required
                                    value={this.state.from1}
                                    onChange={this.onChangefrom1.bind(this)}
                                    name="from1"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">To</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="to1"
                                    required
                                    value={this.state.to1}
                                    onChange={this.onChangeto1.bind(this)}
                                    name="to1"
                                />
                            </div>
                    
                    <button className="btn btn-default" type="button" onClick={this.dosearch} > Go</button>

                    {chartConfigs.Chart}</div>



                <ReactFC {...chartConfigs} />;


            </div>
        );
    }
}

export default CompareCompany;