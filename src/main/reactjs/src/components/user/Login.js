import React, { Component } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import AuthService from "../../services/auth.services";

class Login extends Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    
        this.state = {
          username: "",
          password: "",
          loading: false,
          message: ""
        };
      }
    
      onChangeUsername(e) {
        this.setState({
          username: e.target.value
        });
      }
    
      onChangePassword(e) {
        this.setState({
          password: e.target.value
        });
      }
    
      handleLogin(e) {
        e.preventDefault();
    
        this.setState({
          message: "",
          loading: true
        });
    
    
        if (this.state.username != 0) {
          AuthService.login(this.state.username, this.state.password).then(
            () => {
              this.props.history.push("/profile");
              window.location.reload();
            },
            error => {
              const resMessage =
                (error.response && error.response.data &&error.response.data.message) 
                ||error.message 
                ||error.toString();
    
              this.setState({
                loading: false,
                message: resMessage
              });
            }
          );
        } else {
          this.setState({
            loading: false
          });
        }
      }

    render() {
        return (
            <Card style={{ width: '35rem' }} className={"border border-dark bg-dark text-white"}>
                <Card.Header className={"text-center"}>Please Log in</Card.Header>
                <Form onSubmit={this.handleLogin}>
                    <Card.Body>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label >Username</Form.Label>
                            <Form.Control type="username" onChange={this.onChangeUsername} />
                            <Form.Text className={"text-muted text-white"}>
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" onChange={this.onChangePassword}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">Log in</Button>
                       
                    </Card.Body>
                </Form>
            </Card>
            
        );

    }
}

export default Login;

// import React, { Component } from "react";
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";

// import AuthService from "../../services/auth.services";



// export default class Login extends Component {

//   render() {
//     return (
//       <div className="col-md-12">
//         <div className="card card-container">
//           <img
//             src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
//             alt="profile-img"
//             className="profile-img-card"
//           />

//           <Form onSubmit={this.handleLogin} ref={c => {this.form = c;}}>
//             <div className="form-group">
//               <label htmlFor="username">Username</label>
//               <Input
//                 type="text"
//                 className="form-control"
//                 name="username"
//                 value={this.state.username}
//                 onChange={this.onChangeUsername}
//                 validations={[required]}
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <Input
//                 type="password"
//                 className="form-control"
//                 name="password"
//                 value={this.state.password}
//                 onChange={this.onChangePassword}
//                 validations={[required]}
//               />
//             </div>

//             <div className="form-group">
//               <button
//                 className="btn btn-primary btn-block"
//                 disabled={this.state.loading}
//               >
//                 {this.state.loading && (
//                   <span className="spinner-border spinner-border-sm"></span>
//                 )}
//                 <span>Login</span>
//               </button>
//             </div>

//             {this.state.message && (
//               <div className="form-group">
//                 <div className="alert alert-danger" role="alert">
//                   {this.state.message}
//                 </div>
//               </div>
//             )}
            // <CheckButton style={{ display: "none" }}ref={c => { this.checkBtn = c;}}/>
//           </Form>
//         </div>
//       </div>
//     );
//   }
// }