import React, { Component } from 'react';
import { Card, Table, Dropdown, InputGroup, FormControl, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStepBackward, faStepForward, faFastForward, faFastBackward } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

class Stocks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stocks: [], //we have to change that to currencies 
            currentPage: 1,
            stocksPerPage: 15,
            oldStockName: "AAPL",
            stockName: "AAPL"
        }
    }

    componentDidMount() {
        this.getStocks();
    }

    getStocks() {
        axios.get("https://finnhub.io/api/v1/quote?symbol="+this.state.stockName+"&token=c0t93rv48v6r4maemvu0")
            .then(response => response.data)
            .then((data) => {
                this.setState({ stocks: data})

            });
    }

    changePage = event => {
        this.setState({
            [event.target.name]: parseInt(event.target.value)
        });
    };

    firstPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: 1
            });
        }
    };

    prevPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage - 1
            });
        }
    };

    nextPage = () => {
        if (this.state.currentPage < Math.ceil(Object.entries(this.state.stocks).length / this.state.stocksPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    };

    lastPage = () => {
        if (this.state.currentPage < Math.ceil(Object.entries(this.state.stocks).length / this.state.stocksPerPage)) {
            this.setState({
                currentPage: Math.ceil(Object.entries(this.state.stocks).length / this.state.stocksPerPage)
            });
        }
    };

    onChange = event => {
        this.setState({stockName: event.target.value}, function () {
        });

    };
    updateStock = event => {
        this.state.oldStockName = this.state.stockName;
        this.getStocks();
        
        console.log(this.state.stockName)
    };
    
    render() {
       
        const { stocks, currentPage, stocksPerPage } = this.state;
        const totalStocks = Object.entries(stocks).length;

        const lastIndex = currentPage * stocksPerPage;
        const firstIndex = lastIndex - stocksPerPage;

        const totalPages = Math.round((totalStocks / stocksPerPage) + 1);
        const pageCss = {
            width: "45px",
            border: "1px solid #17A2BB",
            color: "#17A2BB",
            textAlign: "center",
            fontWeight: "bold"

        }
    
        

        return (

            <Card className={"border  border-dark bg-dark text-white text-center"}>
                <Card.Header>ForeignExchange</Card.Header>
                <Card.Body>
                <form onChange={this.onChange}>
                    <label>
                        Search for Stocks:
                        <input type="text" name="stockName" id="stockName" />
                    </label>
                    <Button onClick={this.updateStock}>Search</Button>
                    </form>
                    <Table bordered hover striped variant="dark" className={"text-white"}>
                        <thead>
                            <tr>
                                <th>Stock Symbol</th>
                                <th>Current Price</th>
                                <th>Highest price of the day</th>
                                <th>Lowest price of the day</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                totalStocks !== 0 ?
                                    [<tr key ="12">
                                        <td>{this.state.oldStockName}</td>
                                        <td>{this.state.stocks.c}</td>
                                        <td>{this.state.stocks.h}</td>
                                        <td>{this.state.stocks.l}</td>
                                      </tr>]
                                    
                                    :
                                    <tr>
                                    <td></td>
                                    </tr>

                            }
                        </tbody>
                    </Table>
                </Card.Body>
                <Card.Footer className="footerMargin">
                    <div style={{ "float": "left" }}>
                        Showing Page {currentPage} of {totalPages}
                    </div>
                    <div style={{ "float": "right" }}>
                        <InputGroup size="sm">
                            <InputGroup.Prepend>
                                <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false} onClick={this.firstPage}><FontAwesomeIcon icon={faFastBackward} /> First</Button>
                                <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false} onClick={this.prevPage}><FontAwesomeIcon icon={faStepBackward} /> Prev</Button>
                            </InputGroup.Prepend>
                            <FormControl style={pageCss} className="bg-dark" name="currentPage" value={currentPage} onChange={this.changePage} />
                            <InputGroup.Append>
                                <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false} onClick={this.nextPage}><FontAwesomeIcon icon={faStepForward} /> Next</Button>
                                <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false} onClick={this.lastPage}><FontAwesomeIcon icon={faFastForward} /> Last</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                </Card.Footer>
            </Card>
        );
    }
}

export default Stocks;