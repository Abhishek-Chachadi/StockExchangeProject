
import React from 'react';
import Table from 'react-bootstrap/Table';
import Service from './Service';
export default class CompanyexchangeMap extends React.Component{

    //     constructor(props) {
    //         super(props);
    //         this.onChangecompanyName = this.onChangecompanyName.bind(this);
    //         this.onChangeexchangeName = this.onChangeexchangeName.bind(this);
    //         this.onChangecompanyCode = this.onChangecompanyCode.bind(this);
    //         this.state = {
    //             companyName:'',
    //             exchangeName:'',
    //             companyCode:'',
    //             exchangeMap:[],
    //             submitted:false
    //         };
    //     }
    //    componentDidMount()
    //    {
    //     Service.getExchangeMap().then((response => {
    //         this.setState({exchangeMap:response.data})
    //     }));
    //    }

    
    
    //     onChangecompanyName=(e)=> {
    //         this.setState({
    //             companyName: e.target.value
    //         });
    //         //console.log(companyName);
    //     }
    
    //     onChangeexchangeName=(e)=> {
    //         this.setState({
    //             exchangeName: e.target.value
    //         });
    //        // console.log(exchangeName);
    //     }
    //     onChangecompanyCode=(e)=> {
    //         this.setState({
    //             companyCode: e.target.value
    //         });
    //     }
      
    //     onChangeHandler=(e)=>{
    //         this.setState({[e.target.name]:e.target.value});
    //     }
    //     savecompanymap(e) {
    //         e.preventDefault();
    //         console.log(this.state.companyName)
    //         var data = {
    //             companyName:JSON.stringify(this.state.companyName),
    //             exchangeName:JSON.stringify(this.state.exchangeName),
    //             companyCode:JSON.stringify(this.state.companyCode),
    //         };
    //         console.log(JSON.stringify(data));
    //         const requestOptions = {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': 'Bearer my-token',
             
    //             },
    //             body: JSON.stringify(data)
    //         };
    //         fetch('http://localhost:8080/mapcompanycode', requestOptions)
    //             .then(response => {
    //                 this.setState({
    //                     submitted:true
    //                 });
    //                 console.log(response.data);
    //             })
    //             .catch(e=> {
    //                 console.log(e);
    //             });
    //     }
    
    //     handlesubmit=(e)=>{
    //         e.preventDefault();
    //         console.log(JSON.stringify(this.state.companyName));
            
    //     }
    //     newcompanymap(e) {
    //         this.setState({
    //             companyName:"",
    //             exchangeName:"",
    //             companyCode:"",
    //             submitted: false
    //         });
    //         alert("DONE");
    //     }
    
    //     render() {
    //         return (
    //             <div className="submit-form">
    //                 {this.state.submitted ? (
    //                     <div>
    //                         <h4>You submitted successfully!</h4>
    //                         <button className="btn btn-success" onClick={this.newcompanymap}>
    //                             Add Company Map
    //                         </button>
    //                     </div>
    //                 ) : (
    //                     <div>
    //                         <div className="form-group" class = "col-md-6">
    //                             <label htmlFor="title">Company Name</label>
    //                             <input
    //                                 type="text"
    //                                 className="form-control"
    //                                 id="companyName"
    //                                 required
    //                                 value={this.state.companyName}
    //                                 onChange={this.onChangeHandler}
    //                                 name="companyName"
    //                             />
    //                         </div>
    //                         <div className="form-group" class = "col-md-6">
    //                             <label htmlFor="title">Exchange Name</label>
    //                             <input
    //                                 type="text"
    //                                 className="form-control"
    //                                 id="exchangename"
    //                                 required
    //                                 value={this.state.exchangeName}
    //                                 onChange={this.onChangeHandler}
    //                                 name="exchangeName"
    //                             />
    //                         </div>
    //                         <div className="form-group" class = "col-md-6">
    //                             <label htmlFor="title">Company Code</label>
    //                             <input
    //                                 type="text"
    //                                 className="form-control"
    //                                 id="companyCode"
    //                                 required
    //                                 value={this.state.companyCode}
    //                                 onChange={this.onChangeHandler}
    //                                 name="companyCode"
    //                             />
    //                         </div>
                            
    //                         <button onClick={this.savecompanymap} className="btn btn-success">
    //                             Submit
    //                         </button>
    //                     </div>
    //                 )}
    //                 <div className="col-md-6">
    //                     <h4>Company Map List</h4>
    //                     <ul className="list-group">
    //                     </ul>
    //                 </div>

    //                 <div>
    //             <h1 className="text-center"> Company List</h1>
    //             <Table className = "table table-dark table-striped table-hover">
    //                 <thead className ="thead-dark">
    //                     <tr>
    //                         <td>Company Exchange Map-ID</td>
    //                         <td>Company Name</td>
    //                         <td>Exchange Name </td>
    //                         <td>Company Code</td>
    //                     </tr>
    //                 </thead>
                
    //         <tbody>
    //             {
    //                 this.state.exchangeMap.map(
    //                     company =>
    //                     <tr key = {company.id}>
    //                         <td>{company.id}</td>
    //                         <td>{company.company.companyName}</td>
    //                         <td>{company.stockexchange.name}</td>
    //                         <td>{company.companyCode}</td>
                          
                            
    //                     </tr>
    //                 )
    //             }
    //             </tbody>
    //             </Table>
    //         </div>
    //             </div>
    //         );
    //     }

    constructor(props) {
        super(props);
        this.savemap = this.savemap.bind(this);
        this.newmap = this.newmap.bind(this);
        this.state = {
            companyName: "",
            companyCode: "",
            name: "",
            submitted:false,
            exchangeMap:[],
        };
    }
    componentDidMount()
       {
        Service.getExchangeMap().then((response => {
            this.setState({exchangeMap:response.data})
        }));
       }
    changecompanyName(e){
        this.setState({companyName:e.target.value});
    }
    changecompanycode(e){
        this.setState({
            companyCode: e.target.value
        });
    }
    changename(e){
        this.setState({
            name:e.target.value
        });
    }
    

    savemap() {
        var data = {
            companyName: this.state.companyName,
            companyCode: this.state.companyCode,
            name: this.state.name
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
        fetch('https://phase3stockexchange.herokuapp.com/mapcompanycode', requestOptions)
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

    newmap() {
        this.setState({
            companyName:"",
            companyCode:"",
            name:"",
            submitted:false
        });
    }

    render() {
        return (
            <div>
                <div className="submit-form">
                    {this.state.submitted ? (
                        <div>
                            <h4>You submitted successfully!</h4>
                            <button className="btn btn-success" onClick={this.newmap}>
                                Add
                            </button>
                        </div>
                    ) : (
                            <div>
                             <div className="form-group">
                                 <label htmlFor="title">Company Name</label>
                                 <input
                                    type="text"
                                     className="form-control"
                                     id="companyName"
                                     required
                                     value={this.state.companyName}
                                     onChange={this.changecompanyName.bind(this)}
                                    name="companyName"
                                 />
                             </div>

                            <div className="form-group">
                                <label htmlFor="title">Company Code</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="companyCode"
                                    required
                                    value={this.state.companyCode}
                                    onChange={this.changecompanycode.bind(this)}
                                    name="companyCode"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">Stock Exchange Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    required
                                    value={this.state.name}
                                    onChange={this.changename.bind(this)}
                                    name="name"
                                />
                            </div>
                            

                            <button onClick={this.savemap} className="btn btn-success">
                                Submit
                            </button>
                        </div>
                    )}
                </div>
                <div>
                <h1 className="text-center"> Company List</h1>
                <Table className = "table table-dark table-striped table-hover">
                    <thead className ="thead-dark">
                        <tr>
                            <td>Company Exchange Map-ID</td>
                            <td>Company Name</td>
                            <td>Exchange Name </td>
                            <td>Company Code</td>
                        </tr>
                    </thead>
                
            <tbody>
                {
                    this.state.exchangeMap.map(
                        company =>
                        <tr key = {company.id}>
                            <td>{company.id}</td>
                            <td>{company.company.companyName}</td>
                             <td>{company.stockexchange.name}</td>
                            <td>{company.companyCode}</td>
                          
                            
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





