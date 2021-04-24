import React, { Component } from 'react';
import { Card, Table, Dropdown, InputGroup, FormControl, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStepBackward, faStepForward, faFastForward, faFastBackward } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

class Crypto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cryptoSymbols: [], //we have to change that to currencies 
            currentPage: 1,
            cryptoSymbolsPerPage: 15,
            cryptoData:[],
            selectedCurrency: "BINANCE:MTHBTC"
        }
    }

    componentDidMount() {
        this.getCryptoInfo();
        this.getCryptoSymbols();
       
    }

    getCryptoSymbols() {
        axios.get("https://finnhub.io/api/v1/crypto/symbol?exchange=binance&token=c0t93rv48v6r4maemvu0")
            .then(response => response.data)
            .then((data) => {
                this.setState({ cryptoSymbols: data })

            });
    }

    getCryptoInfo() {
        var currentTimeInSeconds=Math.floor(Date.now()/1000); //unix timestamp in seconds
        axios.get("https://finnhub.io/api/v1/forex/candle?symbol="+this.state.selectedCurrency+"&resolution=D&from=1572651390&to="+currentTimeInSeconds+"&token=c0t93rv48v6r4maemvu0")
            .then(response => response.data)
            .then((data) => {
                this.setState({ cryptoData: data })

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
        if (this.state.currentPage < Math.ceil(Object.entries(this.state.cryptoSymbols).length / this.state.cryptoSymbolsPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    };

    lastPage = () => {
        if (this.state.currentPage < Math.ceil(Object.entries(this.state.cryptoSymbols).length / this.state.cryptoSymbolsPerPage)) {
            this.setState({
                currentPage: Math.ceil(Object.entries(this.state.cryptoSymbols).length / this.state.cryptoSymbolsPerPage)
            });
        }
    };

    dropDown = event => {
        this.setState({selectedCurrency: event.target.value}, function () {
            this.getCryptoInfo();

        });
       
        
    };
    
    render() {

        const { cryptoSymbols, currentPage, cryptoSymbolsPerPage, cryptoData } = this.state;
        const totalGraph = Object.entries(cryptoData).length;

        const lastIndex = currentPage * cryptoSymbolsPerPage;
        const firstIndex = lastIndex - cryptoSymbolsPerPage;
    
        const totalPages = Math.round((totalGraph / cryptoSymbolsPerPage) + 1);
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
                        Select Currency             
                        <select defaultValue="USD" onChange={this.dropDown}>
                        {cryptoSymbols.map((anObjectMapped, index) => (
                                 <option key={`${anObjectMapped.symbol}_{anObjectMapped.symbol}`} value={anObjectMapped.symbol}>{anObjectMapped.symbol} </option>
                            ))}
                        </select>
                    <Table bordered hover striped variant="dark" className={"text-white"}>
                        <thead>
                            <tr>
                                <th>Currency Name</th>
                                <th>Currency Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cryptoData.length !== 0 ?
                                [<tr key ="12">
                                    <td>{this.state.selectedCurrency}</td>
                                    <td>{this.state.cryptoData.c[totalGraph]}</td>
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

export default Crypto;