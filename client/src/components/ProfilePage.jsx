import React, { Component } from "react";
import NotifyComponent from "./NotifyComponent";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import EaxyChart from "./char/chart";
import Calendar from 'react-calendar';
import { Client } from '@stomp/stompjs';
import {
  Card,
  Button,
  CardHeader,
  Col,
  Row
} from 'reactstrap';


export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAdmin: false,
      isLoadedChart: false,
      chartData: [],
      errorStatus: false,
      error: null,
      date: new Date(),
      dateChanged: false,

      currentUser: AuthService.getCurrentUser()
    };

    this.loadChartData = this.loadChartData.bind(this);
    this.pickDate = this.pickDate.bind(this);
    this.addMeasurement = this.addMeasurement.bind(this);

  }

  loadChartData(){
    if(this.state.dateChanged === true){
        const date1 = UserService.getUserHistC(JSON.parse(localStorage.getItem('user'))?.id, this.state.date.getMonth() + 1, this.state.date.getDate())
                    .then((response) => {this.setState({
                                                chartData : response.data,
                                                isLoadedChart : true
                                              });
                  });     
    }else{
      const date2 = UserService.getUserCurrC(JSON.parse(localStorage.getItem('user'))?.id)
                  .then((response) => {this.setState({
                                              chartData : response.data,
                                              isLoadedChart : true
                                            });
                });   
    } 
  }

  pickDate(e){
      this.setState({
        date: e,
        dateChanged: true
      })
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

  addMeasurement(){
    this.props.history.push('/add-measurement/-1');
}

  render() {
    const { currentUser } = this.state;

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.accessToken}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <p>
          <strong>Role:</strong>{" "}
          {currentUser.role}
        </p>
        {(currentUser.role == "ADMIN") && (
          <div class="btn-group" role="group" aria-label="Basic example">
            <a href="/users" class="btn btn-default"><i class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></i>Users</a>
            <a href="/devices" class="btn btn-primary active"><i class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></i> Devices</a>
            <a href="/sensors" class="btn btn-default"><i class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></i>Sensors</a>
          </div>
        )}
       
       {(currentUser.role == "CLIENT") && (
          <div>
            <Button color="primary" onClick={this.addMeasurement}>+ Measurement</Button>
            <CardHeader>
                <strong> Consumption </strong>
            </CardHeader>
            <Card>
                <Col sm={{size: '8', offset: 1}}>
                        <Calendar value={this.state.date} onChange={e => this.pickDate(e)}/>
                    </Col>
                <Row>
                    <Col sm={{size: '8', offset: 1}}>
                        {!this.state.dateChanged && this.state.isLoadedChart && <EaxyChart chartData = {this.state.chartData}/>}
                        
                    </Col>
                </Row>
                <Row>
                    <Col sm={{size: '8', offset: 1}}>
                        {this.state.dateChanged && this.state.isLoadedChart && <EaxyChart chartData = {this.state.chartData}/>}
                        
                    </Col>
                </Row>
                <Button color="primary" onClick={this.loadChartData}>LOAD</Button>
            </Card>
          </div>
          )}
        
        <div>
          <br></br>
          <NotifyComponent />
        </div>
      </div>
    );
  }
}