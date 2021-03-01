import React, { Component } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }
    submitLogin(event) {
        alert(this.state.email, this.state.password);
        event.preventDefault();
    }
    render() {
        return (
            <Card style={{ width: '35rem' }} className={"border border-dark bg-dark text-white"}>
                <Card.Header className={"text-center"}>Please Log in</Card.Header>
                <Form onSubmit={this.submitLogin} id="loginFormId">
                    <Card.Body>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label >Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" />
                            <Form.Text className={"text-muted text-white"}>
                                We'll never share your email with anyone else.
                    </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">Log in</Button>
                    </Card.Body>
                </Form>
            </Card>
        );
    }
}

export default Login;