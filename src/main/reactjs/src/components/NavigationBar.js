import React, { Component,Fragment  } from 'react';
import { Navbar, Nav, Jumbotron } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Logout from './user/Logout'
import Login from './user/Login'
import Register from './user/Register'
import {
    NavItem,
  } from 'react-bootstrap';

class NavigationBar extends Component {
    state = {
        isOpen: false
      }
      static propTypes = {
        auth: PropTypes.object.isRequired
      }
    
      toggle = () => {
        this.setState({
          isOpen: !this.state.isOpen
        })
      }
    render() {
        const { isAuthenticated, user } = this.props.auth
        const authLinks = (
          <Fragment>
            <NavItem>
              <span className="navbar-text mr-3">
                <strong>{user ? `Welcome ${user}` : ''}</strong>
              </span>
            </NavItem>
            <NavItem>
              <Logout></Logout>
            </NavItem>
          </Fragment>
        )
    
        const guestLinks = (
            <Fragment>
            <NavItem>
              <Register>Register</Register>
            </NavItem>
            <NavItem>
              <Login>Login</Login>
            </NavItem>
          </Fragment>
        )
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
                        <Nav className='ml-auto'>{isAuthenticated ? authLinks : guestLinks}</Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
  })

export default connect(mapStateToProps, null)(NavigationBar);