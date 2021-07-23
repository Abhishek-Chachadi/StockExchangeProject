import React, { Component } from 'react';

import './App.css';



//import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';


import {Switch, HashRouter ,Router, Route, Link } from "react-router-dom";

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
            "subCaption": "In MMbbl = One Million barrels",
            "xAxisName": "Company",
            "yAxisName": "SHare Price",
            "numberSuffix": "K",
            "theme": "fusion",
        },
        // Chart Data
        "data": [{
            "label": "MAruti",
            "value": "290"
        }, {
            "label": "LG",
            "value": "260"
        }, {
            "label": "Nokia",
            "value": "180"
        }]
    },
};

class App extends Component {

		constructor(props){
			
				super(props);
				this.state = chartConfigs;
				
				this.dosearch = this.dosearch.bind(this);
		
		}
		
	
		dosearch(){
				
			const myInit1  = {
				method: 'GET',
				headers: { 'Content-Type': 'application/json',
				'Access-Control-Allow-Origin' : '*',
				'Vary': 'Origin' },
	
		};
				let searchval = this.refs.searchInput.value;//get node value or text value
				console.log(searchval);
				let data  =[];
				let endpoint ='http://127.0.0.1:8080/getstockprices';
				//you need to give end slash ony if you call from rest endpint
				 fetch(endpoint,myInit1)
				
								 .then(response => {
			

			 return response.json();
				 })
								.then(response => {
							 console.log(response);//real print of array
							 

							 var prevDs = Object.assign({}, this.state.dataSource);
						
										response.forEach((value, key) => {  
									//		data[key] = {
										prevDs.data[key] ={
										
											'label' : response[key].companycode,
											'value' : response[key].shareprice
										 };
									
										 
										 this.setState({
											dataSource: prevDs,
										  });
									
                   console.log('data'+JSON.stringify(data));
           
				  
				   
									});
                                  console.log('this.'+ data);
									console.log('chart'+JSON.stringify(chartConfigs));
							
							
								})//endo of .then line 53				
							
								}
		
				 
							
		
	render() {
		return (
			<div className="App">
				 
				
				
			<div className="input-group">
								
								<input type="text" className="form-control" placeholder="Search for Projects" ref='searchInput'/>
								<button className="btn btn-default" type="button" onClick={this.dosearch} > Go</button> 
								
								{chartConfigs.Chart}</div>
								
					 
							 
							 <ReactFC {...chartConfigs} />;
						
				
			</div>
		);
	}
}

export default App;