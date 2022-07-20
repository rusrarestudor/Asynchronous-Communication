import React, { Component } from "react";
import { Switch, Route, Router,Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';

import AuthService from "./services/AuthService";
import AdminPage from "./components/AdminPage";
import UserPage from "./components/UserPage";
import AddUserComponent from './components/userComponents/AddUserComponent';
import ListUserComponent from './components/userComponents/ListUserComponent';
import ListDevicesComponent from './components/devicesComponents/ListDevicesComponent';
import AddDeviceComponent from './components/devicesComponents/AddDeviceComponent';
import HomeComponent from './components/HomeComponent';
import ListSensorComponent from './components/sensorComponents/ListSensorsComponents';
import AddSensorComponent from './components/sensorComponents/AddSensorComponent';
import Register from './components/Register';
import Login from './components/Login';
import ProfilePage from './components/ProfilePage';
import { PrivateRoute } from "./components/PrivateRoute";
import AddMeasuremetnComponent from "./components/measurementComponents/AddMeasuremetnComponent";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {

    };
  }



  logOut() {
    AuthService.logout();
  }

  render() {

    return (
      <div>
          <HeaderComponent />
          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={HomeComponent} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={ProfilePage} />
              <Route path="/user" component={UserPage} />
              <Route path="/admin" component={AdminPage} />
              <Route path = "/users" component = {ListUserComponent}></Route>
              <Route path = "/add-user/:id" component = {AddUserComponent}></Route>
              <Route path = "/devices" component = {ListDevicesComponent}></Route>
              <Route path = "/add-device/:id" component = {AddDeviceComponent}></Route>
              <Route path = "/sensors" component = {ListSensorComponent}></Route>
              <Route path = "/add-sensor/:id" component = {AddSensorComponent}></Route> 
              <Route path = "/add-measurement/:id" component = {AddMeasuremetnComponent}></Route> 
              
            </Switch>
          </div>
      </div>
    );
  }
}

export default App;