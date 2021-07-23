import React from 'react';
import Table from "react-bootstrap/Table";
import Service from './Service';
export default class UpcomingIPO extends React.Component{
  
        constructor(props) {
            super(props);
            this.state = {
                ipolist: []
            };
        }
        componentDidMount() {
            Service.getIpoDetailFromCompany().then((response => {
                this.setState({ ipolist: response.data })
            }));
        }
    
        render() {
            return (
                <div>
                    <h1 className="text-center"> Upcoming IPO Details</h1>
                    <Table className="table table-dark table-striped">
                        <thead>
                            <tr>
                                <td>IPO-ID</td>
                                <td>Company Name</td>
                                <td>Open Date Time</td>
                                <td>Price Per Share</td>
                                <td>Total Number Of Shares</td>
                            </tr>
                        </thead>
    
                        <tbody>
                            {
                                this.state.ipolist.map(
                                    ipolist =>
                                        <tr key={ipolist.id}>
                                            <td>{ipolist.id}</td>
                                            <td>{ipolist.companyName}</td>
                                            <td>{ipolist.openDateTime}</td>
                                            <td>{ipolist.pricePerShare}</td>
                                            <td>{ipolist.totalNumberOfShares}</td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </Table>
                    </div>
            );
        }
    }
