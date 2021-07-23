import React, { Component } from 'react';
import './App.css';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';


import { Switch, HashRouter, Router, Route, Link } from "react-router-dom";
import { Card } from 'react-bootstrap';

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
			"xAxisName": "Company Code",
			"yAxisName": "Share Price",

			"theme": "fusion",
		},
		// Chart Data
		"data": []
	},
};

const dataSource2Companies = {
	chart: {
		caption: "Comparison of 2 companies over time",
		exportEnabled: "1",
		exportMode: "client",
		yAxisName: "Price",
		numberprefix: "Rs.",
		showhovereffect: "1",
		theme: "fusion"
	},

	// categories: [{
	// 	category: this.state.category
	// }],

 	dataset: [{
 	//	seriesname: this.state.companyselected,
 		data: {
			 'value':"op"
		 }
 	}]
	// {
	// 	seriesname: this.state.secondcompanyselected,
	// 	data: this.state.companyValue2
	// }]
 }

class FusionChart extends Component {

	constructor(props) {

		super(props);
		this.state = chartConfigs;
		this.dosearch = this.dosearch.bind(this);
		this.onChangeCompanySelected = this.onChangeCompanySelected.bind(this);
		this.onChangeSecondCompanySelected = this.onChangeSecondCompanySelected.bind(this);
		this.onchangeStockExchangeName = this.onchangeStockExchangeName.bind(this);
		this.onChangefrom1 = this.onChangefrom1.bind(this);
		this.onChangeto1 = this.onChangeto1.bind(this);
		//this.doSearchCompanies = this.doSearchCompanies.bind(this);
		this.state = {
		companyselected : "HP8",
		category : "",
		companyValue1 : null,
		companyValue2 : null,
		exchangename : "NSE",
		secondcompanyselected : "HP9"
		}
	}

	dosearch() {

		var dataSend = {
            companyname1: this.state.companySelected,
            companyname2: this.state.secondCompanySelected,
            name: this.state.exchangename,
            from1:this.state.from1,
            to1:this.state.to1,

        };
		const myInit1 = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Vary': 'Origin'
			},
			body:JSON.stringify(dataSend)
			
		};
		console.log(dataSend);
		
		let searchval = this.refs.searchInput.value;//get node value or text value
		console.log(searchval);
		//let endpoint = 'http://localhost:8080/getstockprices';
		let endpoint = 'http://localhost:8080/getmultiplecompany';
		//you need to give end slash ony if you call from rest endpint
	 	fetch(endpoint, myInit1)

	 		.then(response => {
	 			return response.json();
	 		})
	 		.then(response => {
			     console.log(response);//real print of array
	 			console.log(response.firstList[0].datee);
				 
				 var prevDs = Object.assign({}, this.state.dataSource2Companies);
				 console.log(prevDs);

				 let category =[];
				 let companyValue1 = [];
				 let companyValue2 = [];
				 var length1 = response.firstList.length;
				 for(var i=0;i<length1;i++)
				 {
					 let date = response.firstList[i].datee;
					 let price1 = response.firstList[i].shareprice;
					 let tempObj = {
					 "label":date
				 }
				 let comp1obj = {
					 "value":price1
				 }

				 	 category.push(tempObj);
					 companyValue1.push(comp1obj);
				 }
				 var length2 = response.secondList.length;
				 for(var i=0;i<length2;i++)
				 {
					 let date = response.secondList[i].datee;
					 let price1 = response.secondList[i].shareprice;
					 let tempObj = {
						"label":date
					}
					let comp2obj = {
						"value":price1
					}
					 category.push(tempObj);
					 companyValue2.push(comp2obj);
				 }

				 
				 
						

				 this.setState({
						category:category,
						companyValue1:companyValue1,
						companyValue2:companyValue2
				 })


			 });
	// 		//var prevDs = Object.assign({}, this.state.dataSource2Companies);
	// 		// response.forEach((value, key) => {
	// 		// 		//		data[key] = {
	// 		// 		prevDs.data[key] = {
	// 		// 			//prevDS.dataS = {
	// 		// 			'label': response[key].companyCode,
	// 		// 			'value': response[key].shareprice
	// 		// 		};


	// 		// 		this.setState({
	// 		// 			dataSource: prevDs,
	// 		// 		});

	// 		// 		console.log('data' + JSON.stringify(data);


	// 		// 	});
	// 		// 	console.log('this.' + data);
	// 		// 	console.log('chart' + JSON.stringify(chartConfigs));


	// 	//	})//endo of .then line 53				

	 }

	
	onChangeCompanySelected(e) {
		this.setState({
			companySelected: e.target.value
		});
	}
	onChangeSecondCompanySelected(e) {
		this.setState({
			secondCompanySelected: e.target.value
		});
	}
	onchangeStockExchangeName(e) {
		this.setState({
			exchangename: e.target.value
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



	render() {
		return (
			<div className="App">


				<div>
					<div className="form-group" class="col-md-6">
						<label htmlFor="title">First Company</label>
						<input
							type="text"
							className="form-control"
							id="companyselected"
							required
							value={this.state.companySelected}
							onChange={this.onChangeCompanySelected}
							name="companyselected"
						/>
					</div>

					<div className="form-group" class="col-md-6">
						<label htmlFor="title">Second Company</label>
						<input
							type="text"
							className="form-control"
							id="secondcompanyselected"
							required
							value={this.state.secondCompanySelected}
							onChange={this.onChangeSecondCompanySelected}
							name="secondcompanyselected"
						/>
					</div>
					
					<div className="form-group" class="col-md-6">
						<label htmlFor="title">From Date</label>
						<input
							type="date"
							className="form-control"
							id="from1"
							required
							value={this.state.from1}
							onChange={this.onChangefrom1}
							name="from1"
						/>
					</div>
					<div className="form-group" class="col-md-6">
						<label htmlFor="title">To Date</label>
						<input
							type="date"
							className="form-control"
							id="to1"
							required
							value={this.state.to1}
							onChange={this.onChangeto1}
							name="to1"
						/>
					</div>
					<div className="form-group" class="col-md-6">
						<label htmlFor="title">Second Company</label>
						<input
							type="text"
							className="form-control"
							id="exchangename"
							required
							value={this.state.exchangename}
							onChange={this.onchangeStockExchangeName}
							name="exchangename"
						/>
					</div>


					<button onClick={this.dosearch} className="btn btn-success">
						Submit
					</button>
				</div>


				<div className="input-group">

					<input type="text" className="form-control" placeholder="Search for Projects" ref='searchInput' />
					<button className="btn btn-default" type="button" onClick={this.dosearch} > Go</button>

					{chartConfigs.Chart}</div>



				<ReactFC {...chartConfigs} />;

				<div id="chart">
					<Card id="chart-display">
						<Card.Header id="chart-header">Chart</Card.Header>
						<Card.Body id="chart-body">
							{this.state.secondcompanyselected === ''}?
							<ReactFC
								id="fusioncharts"
								type="line"
								width="100%"
								height="100%"
								dataFormat="JSON"
							/>
						</Card.Body>
						:
						<ReactFC
							type="msline"
							width="100%"
							height="100%"
							dataFormat="JSON"
							dataSource={dataSource2Companies} />
					</Card>
				</div>


			</div>
		);
	}
}

export default FusionChart;