import React, { Component } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { register } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'
import { ModalBody } from 'react-bootstrap'
import {
  FormGroup,
  Label,
  Input,
  Alert,
  Modal,
  ModalHeader,
  NavLink,

} from 'reactstrap'

class Register extends Component {
  state = {
    modal: false,
    email: '',
    username: '',
    password: '',
    msg: null
}

static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

componentDidUpdate(prevProps) {
    const { error, isRegistered } = this.props;
    if (error !== prevProps.error) {
        //check for register error
        if (error.id === 'REGISTER_FAIL') {
            this.setState({ msg: error.msg.message })
        } else {
            this.setState({ msg: null })
        }

    }

    if (this.state.modal) {
        if (isRegistered) {
            this.toggle()
        }
    }

}
toggle = () => {
    //clear errors
    this.props.clearErrors(); 
    
    this.setState({
        modal: !this.state.modal
    });

}

onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
}
onSubmit = e => {
    e.preventDefault();
    const { email, username, password } = this.state;
   
    //create user object
    const newUser = {
        email,
        username,
        password
    }
    //attempt to register
    this.props.register(newUser);


}


render() {
  return (
    
      <div>
          <NavLink onClick={this.toggle} href="#">Register</NavLink>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>Register</ModalHeader>
              <ModalBody>
                  {this.props.isRegistered ? <Alert color="danger">{"Testing"}</Alert> : null}
                  {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                  <Form onSubmit={this.onSubmit}>
                    <Card.Body>
                    <FormGroup>
                                <Label for="name">Email</Label>
                                <Input type="text" name="email" id="email" placeholder="Email" onChange={this.onChange} className="mb-3">
                                </Input>
                                <Label for="username">username</Label>
                                <Input type="text" name="username" id="username" placeholder="Username" onChange={this.onChange} className="mb-3">
                                </Input>
                                <Label for="password">password</Label>
                                <Input type="password" name="password" id="password" placeholder="Password" onChange={this.onChange} className="mb-3">
                                </Input>
                            </FormGroup>
                        <Button variant="primary" type="submit">Register</Button>
                    </Card.Body>
                 </Form>
              </ModalBody>
          </Modal>
      </div>
  )
}
}

const mapStateToProps = state => ({
  isRegistered: state.auth.isRegistered,
  error: state.error
})

export default connect(mapStateToProps, { register, clearErrors })(Register)