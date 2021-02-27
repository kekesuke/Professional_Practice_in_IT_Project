import React, { Component } from 'react';
import Graph from './Graph';
import { Jumbotron } from 'react-bootstrap';
class Home extends Component {
    render() {
        return (
            <Jumbotron fluid>
                <Graph></Graph>
            </Jumbotron>
        );
    }
}

export default Home;