


import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Alert } from "bootstrap";
import { authenticateUser } from '../../src/services/index';
import axios from 'axios';

class Login extends Component {

    constructor(props){
        super(props)

        this.state = { email: '', password: '', error: ''}

        this.credentialChange = this.credentialChange.bind(this);
        this.resetLoginForm = this.resetLoginForm.bind(this);
        this.routeChange = this.routeChange.bind(this);
    }

    validateUser = () => {
        this.props.authenticateUser(this.state.email, this.state.password);
        setTimeout(() => {
            if(this.props.auth.isLoggedIn){
                console.log('ok');
                return this.props.history.push("/");
            }else{
                this.resetLoginForm();
                this.setState({"error" : "invalid email or password"})
            }
        })
      }
  
    getTitle(){   
        return <h3 className = "text-center">Log In</h3>
    }
  
    routeChange = () =>{ 
        this.props.history.push("/register");
    }
  
    resetLoginForm = () => {
        this.setState({ email: '', password: ''});
    }
  
    credentialChange = (event) => {
        this.setState({
          [event.target.name] : event.target.value
        });
    }

    onSubmit = (event) =>{
        event.preventDefault();

        const data = {
            email: this.email,
            password: this.password
        }
        axios.post("http://localhost:8080/login", data)
            .then(res => {
                console.log(res)
            })
                
    }


    render() {

        const {email, password, error} = this.state;

        return (
                <div>
                <br></br>         
                <div className = "container">
                    <div className = "row">
                        <div className="card col-md-6 offset-md-4 offset-md-4">
                          { this.getTitle() }
                            <div className="card-body">
                                            {error && <Alert variant="danger">{error}</Alert>}
                            <form onSubmit>
                                <div className="mb-3">
                                  <label for="exampleInputEmail1" className="form-label">Email address</label>
                                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                          required autoComplete="off"  name="email" value={email} onChange={e => this.state.email = e.target.value} placeholder="Enter Email Address"/>
                                  
                                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>

                                <div className="mb-3">
                                  <label for="exampleInputPassword1" className="form-label">Password</label>
                                  <input type="password" className="form-control" id="exampleInputPassword1"
                                  required autoComplete="off"  name="password" value={password} onChange={e => this.state.password = e.target.value} placeholder="Enter Password"/>
                                </div>

                                <button type="submit" className="btn btn-primary" >Log In</button>
                                
                                <button type="submit" className="btn btn-primary" onClick={this.routeChange} style={{marginLeft: "10px"}}>Register</button>
                              </form>
                              <br></br>
                              
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
      auth : state.auth
    };
};

const mapDispatchToProps = dispatch => {
  return{
    authenticateUser : (email, password) => dispatch(authenticateUser(email, password))
  };
}

export default Login;