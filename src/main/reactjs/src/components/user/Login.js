import React, { Component } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert

} from 'reactstrap'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { ModalBody } from 'react-bootstrap'
import { login } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'

class Login extends Component {
    state = {
        modal: false,
        username: '',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            //check for register error
            if (error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.message })
            } else {
                this.setState({ msg: null })
            }

        }

        if (this.state.modal) {
            if (isAuthenticated) {
                this.toggle();
            }
        }

    }
    toggle = () => {
        //clear errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault();

        const { username, password } = this.state

        const user = {
            username,
            password
        }

        this.props.login(user);
    }

    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">Login</NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                    <ModalBody >
                        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="username">username</Label>
                                <Input type="text" name="username" id="username" placeholder="Username" onChange={this.onChange} className="mb-3">
                                </Input>
                                <Label for="password">password</Label>
                                <Input type="password" name="password" id="password" placeholder="Password" onChange={this.onChange} className="mb-3">
                                </Input>
                                <Button color='dark' style={{ marginTop: '2rem' }} block>Login</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }

}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { login, clearErrors })(Login)
