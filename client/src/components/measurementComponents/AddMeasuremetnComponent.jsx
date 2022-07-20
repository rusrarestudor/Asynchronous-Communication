import React, { Component } from 'react';
import MeasurementService from '../../services/MeasurementService';

class AddMeasuremetnComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id,
            timeStamp: '',
            value: '',
            sensorID: '',
        }

        this.saveMeasuremetn = this.saveMeasuremetn.bind(this);
        this.changeTimeStampHolder = this.changeTimeStampHolder.bind(this);
        this.changeValueHolder = this.changeValueHolder.bind(this);
        this.changeSensorIDHolder = this.changeSensorIDHolder.bind(this);

    }
    
    changeTimeStampHolder = (event) =>{
        this.setState({timeStamp: event.target.value});
    }

    changeValueHolder = (event) =>{
        this.setState({value: event.target.value});
    }

    changeSensorIDHolder = (event) =>{
        this.setState({sensorID: event.target.value});
    }

    cancel(){
        this.props.history.push('/profile');
    }

    saveMeasuremetn = (e) => {
        e.preventDefault();

        let measurement = {timeStamp: this.state.timeStamp, 
                    value: this.state.value, 
                    sensorID: this.state.sensorID
        };
        
        MeasurementService.addMeasurement(measurement).then(res => {
                    this.props.history.push('/profile');
           
        });
    }
    
    
    render() {
        return (
            <div>
                <br></br>
                <div className = "container">
                    <div className = "row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            Add Measurement
                            <div className="card-body">
                                <form>
                                    <div className ="form-group">
                                        <label>TimeStamp:</label>
                                        <input placeholder="TimeStamp" description="timeStamp" className="form-control"
                                                value={this.state.timeStamp} onChange={this.changeTimeStampHolder}/>
                                    </div>

                                    <div className ="form-group">
                                        <label>Value:</label>
                                        <input placeholder="Value" description="value" className="form-control"
                                                value={this.state.value} onChange={this.changeValueHolder}/>
                                    </div>

                                    <div className ="form-group">
                                        <label>SensorID:</label>
                                        <input placeholder="SensorID" description="sensorID" className="form-control"
                                                value={this.state.sensorID} onChange={this.changeSensorIDHolder}/>
                                    </div>
                                    
                                    <br></br>
                                    
                                    <button className="btn btn-success" onClick={this.saveMeasuremetn}>Save</button>
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

export default AddMeasuremetnComponent;