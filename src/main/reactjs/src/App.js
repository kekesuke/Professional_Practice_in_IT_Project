import "./App.css";
import React, { Component } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import Stocks from './components/Stocks';
import ForeignExchange from './components/ForeignExchange';
import Crypto from './components/Crypto';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/user/Login';
import Register from './components/user/Register'
import {Provider} from 'react-redux'
import store from './store'
import {loadUser} from './actions/authActions'

class App extends React.Component {
        componentDidMount() {
          store.dispatch(loadUser());
        }
        render() {
            const martinTop = {
                marginTop: "20px"
            }
    return (
        
        <Provider store={store}>
        <Router>
            <NavigationBar />
            <Container>
                <Row>
                    <Col lg={12} style={martinTop}>
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/stocks" exact component={Stocks} />
                            <Route path="/crypto" exact component={Crypto} />
                            <Route path="/foreignexchange" exact component={ForeignExchange} />
                            <Route path="/login" exact component={Login} />
                            <Route path="/register" exact component={Register} />
                        </Switch>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </Router>
        </Provider>

    );
    }
}
export default App;

