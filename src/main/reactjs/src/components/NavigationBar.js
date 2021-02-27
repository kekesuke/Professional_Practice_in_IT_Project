import React, { Component } from 'react';
import { Navbar, Nav, Jumbotron } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class NavigationBar extends Component {
    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
                    <Navbar.Brand href="#home">LOGO HERE</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Link className="nav-link" to={""}>Home</Link>
                            <Link className="nav-link" to={"stocks"}>Stocks</Link>
                            <Link className="nav-link" to={"foreignexchange"}>For-ex</Link>
                            <Link className="nav-link" to={"crypto"}>Crypto</Link>
                        </Nav>
                        <Nav>
                            <Link className="nav-link" to={"login"}>Login</Link>
                            <Link className="nav-link" to={"register"}>Register</Link>>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}
