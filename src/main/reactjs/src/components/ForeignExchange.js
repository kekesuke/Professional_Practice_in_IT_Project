import React, { Component } from 'react';
import { Card, Table, Dropdown, InputGroup, FormControl, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStepBackward, faStepForward, faFastForward, faFastBackward } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

class ForeignExchange extends Component {

    constructor(props) {
        super(props);
        this.state = {
            graphs: [], //we have to change that to currencies 
            currentPage: 1,
            graphsPerPage: 15,
            selectedCurrency: "USD"
        }
    }

    componentDidMount() {
        this.getForeignExchange();
    }

    getForeignExchange() {
        axios.get("https://finnhub.io/api/v1/forex/rates?base="+this.state.selectedCurrency+"&token=c0t93rv48v6r4maemvu0")
            .then(response => response.data)
            .then((data) => {
                this.setState({ graphs: data.quote })

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
        if (this.state.currentPage < Math.ceil(Object.entries(this.state.graphs).length / this.state.graphsPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    };

    lastPage = () => {
        if (this.state.currentPage < Math.ceil(Object.entries(this.state.graphs).length / this.state.graphsPerPage)) {
            this.setState({
                currentPage: Math.ceil(Object.entries(this.state.graphs).length / this.state.graphsPerPage)
            });
        }
    };

    dropDown = event => {
        this.setState({selectedCurrency: event.target.value}, function () {
            this.getForeignExchange();
        });

        
    };
    
    render() {

        const { graphs, currentPage, graphsPerPage } = this.state;
        const totalGraph = Object.entries(graphs).length;

        const lastIndex = currentPage * graphsPerPage;
        const firstIndex = lastIndex - graphsPerPage;
        const currentGraphs = Object.entries(graphs).slice(firstIndex, lastIndex).map(([key, value]) => (

            <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
            </tr>
        ));
        const totalPages = Math.round((totalGraph / graphsPerPage) + 1);
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
                        {Object.entries(graphs).map(([key, value]) => (
                                 <option key={key} value={key}>{key} </option>
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
                                graphs.length !== 0 ?
                                    currentGraphs
                                    :
                                    <tr align="center">

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

export default ForeignExchange;