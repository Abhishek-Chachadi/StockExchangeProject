import React, { Component } from 'react';
import logo from './logo.svg';
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
        chart: {
            "caption": "Stock Price",
            "subCaption": "In MMbbl = One Million barrels",
            "xAxisName": "Date",
            "yAxisName": "Share Price",
            "numberSuffix": "K",
            "theme": "fusion",
        },
        // Chart Data
        data: [{
            "label": "Maruti",
            "value": "290"
        }]
    },
};



class FusionChharts extends Component {

    constructor(props) {

        super(props);
        this.state = chartConfigs;
       this.dosearch = this.dosearch.bind(this);
        //this.doSearchSharePrice = this.doSearchSharePrice.bind(this);
        this.changecompanyName = this.changecompanyName.bind(this);
        this.changeexchangeName = this.changeexchangeName.bind(this);
        this.changefrom1 = this.changefrom1.bind(this);
        this.changeto1 = this.changeto1.bind(this);
      //  this.doSearch2Companies = this.doSearch2Companies.bind(this);
      //  this.onChangeCompanyName = this.onChangeCompanyName.bind(this);
      this.state = {
          companyName:"",
          exchangeName:"",
          from1:null,
          to1:null,
          chartConfigs:this.state.chartConfigs
      }
    }


    changecompanyName(e){
        this.setState({
            companyName:e.target.value
        })
    }

    changeexchangeName(e){
        this.setState({
            exchangeName:e.target.value
        })
    }
    changefrom1(e){
        this.setState({
            from1:e.target.value
        })
    }

    changeto1(e){
        this.setState({
            to1:e.target.value
        })
    }

    componentDidMount(){


    }
    
  //  doSearchSharePrice(){
        // let data2 = {
        //     companyName:this.state.companyName,
        //     name:this.state.exchangeName,
        //     from1:this.state.from1,
        //     to1:this.state.to1
        // }
    //     const myinit2 = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Access-Control-Allow-Origin': '*',
    //             'Vary': 'Origin'
    //         },
    //         body: JSON.stringify(data2)

    //     };

    //     let data =[];
    //     var prevDS = Object.assign({}, this.state.dataSource);
    //     fetch('http://localhost:8080/getonecompany',myinit2)
    //     .then(response=>{
    //         return response.json()
    //     })
    //     .then(response=>{
    //         console.log(response);

            
    //         console.log(prevDS.data);
    //         console.log(response[0].datee);
    //         response.forEach((value, key) => {
    //             //		data[key] = {
    //             prevDS.data[key] = {

    //                 'label': response[key].datee,
    //                 'value': response[key].shareprice
    //             };
               


    //             this.setState({
    //                 dataSource: prevDS,
    //             });

    //          //   console.log('data' + JSON.stringify(data));

    //         });
    //     })

       
    // }

    
    dosearch() {

        var data2 = {
            companyName:this.state.companyName,
            name:this.state.exchangeName,
            from1:this.state.from1,
            to1:this.state.to1
        }
        const myInit1 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Vary': 'Origin'
            },
            body:JSON.stringify(data2)

        };
      //  let searchval = this.refs.searchInput.value;//get node value or text value
       // console.log(searchval);
        let data = [];
       // var prevDs = Object.assign({},this.state.dataSource);
       var prevDs = this.state.dataSource;
       console.log(this.state.dataSource);
       console.log(prevDs);
        let endpoint = 'http://localhost:8080/getonecompany';
        //you need to give end slash ony if you call from rest endpint
        fetch(endpoint, myInit1)

            .then(response => {
                return response.json();
            })
            .then(response => {
                console.log(response);//real print of array


                
                console.log(prevDs);
                response.forEach((value,key) => {
                    //		data[key] = {
                    console.log(value);
                    prevDs.data[key] = {

                        'label': value.datee,
                        'value': value.shareprice
                    };


                    this.setState({
                        dataSource: prevDs,
                    });

                    console.log('data' + JSON.stringify(data));

                });
                console.log('this.' + data);
                console.log('chart' + JSON.stringify(chartConfigs));
            })

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
                                    onChange={this.changecompanyName}
                                    name="companyName"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">Company Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exchangeName"
                                    required
                                    value={this.state.exchangeName}
                                    onChange={this.changeexchangeName}
                                    name="exchangeName"
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
                                    onChange={this.changefrom1}
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
                                    onChange={this.changeto1}
                                    name="to1"
                                />
                            </div>
                    <button className="btn btn-default" type="button" onClick={this.dosearch} > Go</button>
                    {/* <button className="btn btn-default" type="button" onClick={this.doSearchSharePrice} > Go shareprice</button> */}

                    {chartConfigs.Chart}</div>



                <ReactFC {...chartConfigs} />;


            </div>
        );
    }
}

export default FusionChharts;