import React, { Component } from 'react';
import SensorService from '../../services/SensorService';
import AuthService from "../../services/AuthService";

class ListSensorComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
                sensors: [],
                isAdmin: false,
                currentUser: AuthService.getCurrentUser()
        }
        this.addSensor = this.addSensor.bind(this);
        this.editSensor = this.editSensor.bind(this);
        this.deleteSensor = this.deleteSensor.bind(this);
    }

    componentDidMount(){
        SensorService.getSensors().then((res) => {
            this.setState({sensors: res.data});
        });
        const user = AuthService.getCurrentUser();
        if(user){
        this.setState({
            curentUser: user,
            isAdmin: user.role.includes("ADMIN")
        });
      
    }
    }

    editSensor(id){
        this.props.history.push(`/add-sensor/${id}`);
    }

    addSensor(){
        this.props.history.push('/add-sensor/-1');
    }

    deleteSensor(id){
        SensorService.deleteSensor(id).then( res => {
            this.setState({sensors: this.state.sensors.filter(sensor => sensor.id != id)});
        });
    }

    render() {
        const { currentUser } = this.state;
        return (
            <div>
                <h2 className="text-center">Sensors</h2>
                <br></br>
                <div className= "row">
                    <button className="btn btn-primary" onClick={this.addSensor}>Add Sensor</button>
                </div>
                <div className= "row">
                    <table className = "table table-striped table-bordered">

                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>MAX</th>
                                <th>DeviceID</th>
                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>
                            {
                                this.state.sensors.map(
                                    sensor => 
                                    <tr key = {sensor.id}>
                                        <td>{sensor.description}</td>
                                        <td>{sensor.max}</td>
                                        <td>{sensor.deviceID}</td>
                                        {(currentUser.role == "ADMIN") && (
                                        <td>
                                            <button onClick={ () => this.editSensor(sensor.sensorID)} className="btn btn-info">Update </button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.deleteSensor(sensor.sensorID)} className="btn btn-danger">Delete </button>
                                        </td>)}

                                    </tr>
                                )
                            }

                        </tbody>
                    </table>

                </div>


            </div>
        );
    }
}

export default ListSensorComponent;