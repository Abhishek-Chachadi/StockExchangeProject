import React, { Component } from 'react';

import './App.css';
import ReactDOM from 'react-dom';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import ReactFusioncharts from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';


import { Switch, HashRouter, Router, Route, Link } from "react-router-dom";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);


let chartConfigs = {
    type: 'mscolumn2d',// The chart type
    width: '700', // Width of the chart
    height: '400', // Height of the chart
    dataFormat: 'json', // Data type
    dataSource: {
            "chart": {
                "caption": "Comparison Cf 2 Companies on Share Prices",
                "xAxisname": "Date",
                "yAxisName": "Share Price",
                "numberPrefix": "Rs.",
                "plotFillAlpha": "80",
                "theme": "fusion"
            },
            "categories": [
                {
                    "category": [
                        
                    ]
                }
            ],
            "dataset": [
                {
                    "seriesname": "Previous year",
                    "data": [
                        
                    ]
                },
                {
                    "seriesname": "Current Year",
                    "data": [
                        
                    ]
                }
            ],
    },
};

class Compare2Companies extends Component {

    constructor(props) {

        super(props);
        this.state = {
            companyName: "",
            companyName2:"",
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
    onChangecompanyName2(e) {
        this.setState({
            companyName2: e.target.value
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
            companyname1: this.state.companyName,
            companyname2: this.state.companyName2,
            from1: this.state.from1,
            to1: this.state.to1
        }

        var data2send2 = {
            name: this.state.name,
            companyName: this.state.companyName2,
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

        // const myInit2 = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Access-Control-Allow-Origin': '*',
        //         'Vary': 'Origin'
        //     },
        //     body: JSON.stringify(data2send2)

        // };
        //let searchval = this.refs.searchInput.value;//get node value or text value
        //console.log(searchval);
        let data = [];
        //let endpoint = 'http://localhost:8080/getmultiplecompany';
        let endpoint =  'https://phase3stockexchange.herokuapp.com/getmultiplecompany';
        //you need to give end slash ony if you call from rest endpint
        fetch(endpoint, myInit1)

            .then(response => {


                return response.json();
            })
            .then(response => {
                console.log(response['firstList']);//real print of array


                var prevDs = Object.assign({}, this.state.dataSource);
                console.log(prevDs);

                // prevDs.dataset[0] = {
                //     'seriesname':this.state.companyName
                // }
                response['firstList'].forEach((value, key) => {
                    //		data[key] = {
                    prevDs.categories[0].category[key] = {

                        'label': response['firstList'][key].datee,
                       
                    };
                    
                    prevDs.dataset[0].data[key] = {
                        'value':response['firstList'][key].shareprice
                    }
                    
                //prevDs.dataset[0]
                   

                  


                    // this.setState({
                    //     dataSource: prevDs,
                    // });

                    console.log('data' + JSON.stringify(data));



                });
                response['secondList'].forEach((value, key) => {
                    //		data[key] = {
                    
                    
                    prevDs.dataset[1].data[key] = {
                        'value':response['secondList'][key].shareprice
                    }
                    
                //prevDs.dataset[0]
                   

                  


                    // this.setState({
                    //     dataSource: prevDs,
                    // });

                    console.log('data' + JSON.stringify(data));



                });

                
                prevDs.dataset[0].seriesname = this.state.companyName
                prevDs.dataset[1].seriesname = this.state.companyName2
                console.log(prevDs);
                this.setState({
                    dataSource: prevDs
                })
               // console.log(dataSource);
                
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
                        <label htmlFor="title">Company Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="companyName2"
                            required
                            value={this.state.companyName2}
                            onChange={this.onChangecompanyName2.bind(this)}
                            name="companyName2"
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



                <ReactFusioncharts {...chartConfigs} />;


            </div>
        );
    }
}

export default Compare2Companies;