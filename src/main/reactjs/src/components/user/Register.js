import React, { Component } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import AuthService from "../../services/auth.services";

class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    
        this.state = {
          username: "",
          email: "",
          password: "",
          successful: false,
          message: ""
        };
      }

      onChangeUsername(e) {
        this.setState({
          username: e.target.value
        });
      }
    
      onChangeEmail(e) {
        this.setState({
          email: e.target.value
        });
      }
    
      onChangePassword(e) {
        this.setState({
          password: e.target.value
        });

      }
    
      handleRegister(e) {
        e.preventDefault();
    
        this.setState({
          message: "",
          successful: false
        });
    
    
        if (this.state.username != 0) {
          AuthService.register(
            this.state.username,
            this.state.email,
            this.state.password
          ).then(
            response => {
              this.setState({
                message: response.data.message,
                successful: true
              });
            },
            error => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
              this.setState({
                successful: false,
                message: resMessage
              });
            }
          );
        }
      }
    

    render() {
        return (
            <Card style={{ width: '35rem' }} className={"border border-dark bg-dark text-white"}>
            <Card.Header className={"text-center"}>Please Register</Card.Header>
            <Form onSubmit={this.handleRegister}>
                    <Card.Body>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label >Username</Form.Label>
                            <Form.Control type="username" onChange={this.onChangeUsername} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label >Email</Form.Label>
                            <Form.Control type="email" onChange={this.onChangeEmail} />
                            <Form.Text className={"text-muted text-white"}>
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" onChange={this.onChangePassword}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">Register</Button>
                        {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}        
                    </Card.Body>
            </Form>
        </Card>
        );
    }
}

export default Register;