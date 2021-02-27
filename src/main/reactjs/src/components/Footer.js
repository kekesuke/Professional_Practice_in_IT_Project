import React, { Component } from 'react';
import { Navbar, Col, Container } from 'react-bootstrap';


class Footer extends Component {
    render() {
        let fullYear = new Date().getFullYear();
        return (
            <div>
                <Navbar fixed="bottom">
                    <Container>
                        <Col lg={12} className="text -center, text-muted">
                            <div>{fullYear}-{fullYear + 1}  All Rights Reserved by ...</div>
                        </Col>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default Footer;