import React, { Component } from 'react';
import SensorService from '../../services/SensorService';

class AddSensorComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id,
            description: '',
            max: '',
            deviceID: '',
        }

        this.changeDescriptionHolder = this.changeDescriptionHolder.bind(this);
        this.changeMaxHolder = this.changeMaxHolder.bind(this);
        this.changeDeviceIDHolder = this.changeDeviceIDHolder.bind(this);
        this.saveSensor = this.saveSensor.bind(this);

    }

    componentDidMount(){

        if( this.state.id < 0 ){
            return
        }else{
            SensorService.getSensorById(this.state.id).then( (res) => {
                let u = res.data;
                this.setState({
                    description: u.description,
                    max: u.max,
                    deviceID: u.deviceID,
                });
            });
        }
    }

    saveSensor = (e) => {
        e.preventDefault();

        let sensor = {description: this.state.description, 
                    max: this.state.max, 
                    deviceID: this.state.deviceID
                };
        console.log('sensor = ' + JSON.stringify(sensor));

        if( this.state.id == -1 ){
            SensorService.addSensor(sensor).then(res => {
                this.props.history.push('/sensors');
            });
        }else{
            SensorService.updateSensor(this.state.id, sensor).then( (res) => {
                this.props.history.push('/sensors');
            });
        }
    }

    cancel(){
        this.props.history.push('/sensors');
    }

    getTitle(){
        if( this.state.id == -1 ){
            return <h3 className = "text-center">Add Sensor</h3>
        }else{
            return <h3 className = "text-center">Update Sensor</h3>
        }
    }

    changeDescriptionHolder = (event) =>{
        this.setState({description: event.target.value});
    }

    changeMaxHolder = (event) =>{
        this.setState({max: event.target.value});
    }

    changeDeviceIDHolder = (event) =>{
        this.setState({deviceID: event.target.value});
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "container">
                    <div className = "row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            { this.getTitle() }
                            <div className="card-body">
                                <form>
                                    <div className ="form-group">
                                        <label>Description:</label>
                                        <input placeholder="Description" description="description" className="form-control"
                                                value={this.state.description} onChange={this.changeDescriptionHolder}/>
                                    </div>

                                    <div className ="form-group">
                                        <label>MAX:</label>
                                        <input placeholder="MAX" description="max" className="form-control"
                                                value={this.state.max} onChange={this.changeMaxHolder}/>
                                    </div>

                                    <div className ="form-group">
                                        <label>DeviceID:</label>
                                        <input placeholder="deviceID" description="deviceID" className="form-control"
                                                value={this.state.deviceID} onChange={this.changeDeviceIDHolder}/>
                                    </div>
                                    
                                    <br></br>
                                    
                                    <button className="btn btn-success" onClick={this.saveSensor}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddSensorComponent;