import React, { Component } from 'react';
import DeviceService from '../../services/DeviceService';
import AuthService from "../../services/AuthService";

class ListDevicesComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
                devices: [],
                isAdmin: false,
                currentUser: AuthService.getCurrentUser()
        }
        this.addDevice = this.addDevice.bind(this);
        this.editDevice = this.editDevice.bind(this);
        this.deleteDevice= this.deleteDevice.bind(this);
    }

    componentDidMount(){
        DeviceService.getDevices().then((res) => {
            this.setState({devices: res.data});
        });

        const user = AuthService.getCurrentUser();
        if(user){
        this.setState({
            curentUser: user,
            isAdmin: user.role.includes("ADMIN")
        });
    }
}

    editDevice(id){
        this.props.history.push(`/add-device/${id}`);
    }

    addDevice(){
        this.props.history.push('/add-device/-1');
    }

    deleteDevice(id){
        DeviceService.deleteDevice(id).then( res => {
            this.setState({devices: this.state.devices.filter(device => device.id != id)});
        });
    }

    render() {
        const { currentUser } = this.state;
        return (
            <div>
                <h2 className="text-center">Devices</h2>
                <br></br>
                {(currentUser.role == "ADMIN") && (
                <div className= "row">
                    <button className="btn btn-primary" onClick={this.addDevice}>Add Device</button>
                </div>)}
                <div className= "row">
                    <table className = "table table-striped table-bordered">

                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Location</th>
                                <th>AVG</th>
                                <th>MAX</th>
                                <th>OwnerID</th>
                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>
                            {
                                this.state.devices.map(
                                    device => 
                                    <tr key = {device.id}>
                                        <td>{device.description}</td>
                                        <td>{device.location}</td>
                                        <td>{device.avg}</td>
                                        <td>{device.max}</td>
                                        <td>{device.userID}</td>
                                        {(currentUser.role == "ADMIN") && (<td> 
                                        
                                            <button onClick={ () => this.editDevice(device.deviceID)} className="btn btn-info">Update </button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.deleteDevice(device.deviceID)} className="btn btn-danger">Delete </button>
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

export default ListDevicesComponent;