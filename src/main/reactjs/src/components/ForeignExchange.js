import React, { Component } from 'react';
import { Card, Table, Dropdown } from 'react-bootstrap'
class ForeignExchange extends Component {
    render() {
        return (
            <Card className={"border  border-dark bg-dark text-white text-center"}>
                <Card.Header>ForeignExchange</Card.Header>
                <Card.Body>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Dropdown Button
                    </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Table bordered hover striped variant="dark" className={"text-white"}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Currency Name</th>
                                <th>Currency Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr align="center">
                                <td>1</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}

export default ForeignExchange;