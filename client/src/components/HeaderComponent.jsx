import React, { Component } from 'react';
import AuthService from '../services/AuthService';
import { Switch, Route, Link } from "react-router-dom";
class HeaderComponent extends Component {
    constructor(props){
        super(props)

        this.state = {

    };

    this.logOut = this.logOut.bind(this);
  }


  logOut() {
    AuthService.logout();
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if(user){
      this.setState({
        curentUser: user,
        isAdmin: user.role.includes("ADMIN")
      });
      
    }
  }

    

    render() {
        const isAdmin = this.state;
        console.log(isAdmin)
        return (
            <div>
                <header>
                    <nav className = "navbar navbar-expand-lg navbar-light bg-light">
                        <div class="container-fluid">
                            <a className="navbar-brand">OEUP App</a>
                            <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav">
                                
                                <li class="nav-item">
                                <a class="nav-link" href="/">Home</a>
                                </li>

                                <li class="nav-item">
                                <a class="nav-link" href="/profile">Profile</a>
                                </li>
                                
                                <li class="nav-item">
                                <a class="nav-link" href="/login">LogIn</a>
                                </li>

                                <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={this.logOut}>LogOut</a>
                                </li>
 
                            </ul>
                            </div>   
                        </div>    
                    </nav>
                </header>
            </div>
        );
    }
}

HeaderComponent.propTypes = {

};

export default HeaderComponent;