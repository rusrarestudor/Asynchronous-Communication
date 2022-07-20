import React, { Component } from 'react';
import DeviceService from '../../services/DeviceService';

class AddDeviceComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id,
            description: '',
            location:'',
            avg: '',
            max: '',
            userID: '',
        }

        this.changeDescriptionHolder = this.changeDescriptionHolder.bind(this);
        this.changeLocationHolder = this.changeLocationHolder.bind(this);
        this.changeAvgHolder = this.changeAvgHolder.bind(this);
        this.changeMaxHolder = this.changeMaxHolder.bind(this);
        this.changeUserIDHolder = this.changeUserIDHolder.bind(this);
        this.saveDevice = this.saveDevice.bind(this);

    }

    componentDidMount(){

        if( this.state.id < 0 ){
            return
        }else{
            DeviceService.getDeviceById(this.state.id).then( (res) => {
                let u = res.data;
                this.setState({
                    description: u.description,
                    location: u.location,
                    avg: u.avg,
                    max: u.max,
                    userID: u.userID,
                });
            });
        }
    }

    saveDevice = (e) => {
        e.preventDefault();

        let device = {description: this.state.description, 
                    location: this.state.location, 
                    avg: this.state.avg, 
                    max: this.state.max, 
                    userID: this.state.userID
                };
        console.log('device = ' + JSON.stringify(device));

        if( this.state.id == -1 ){
            DeviceService.addDevice(device).then(res => {
                this.props.history.push('/devices');
            });
        }else{
            DeviceService.updateDevice(this.state.id, device).then( (res) => {
                this.props.history.push('/devices');
            });
        }
    }

    cancel(){
        this.props.history.push('/devices');
    }

    getTitle(){
        if( this.state.id == -1 ){
            return <h3 className = "text-center">Add Device</h3>
        }else{
            return <h3 className = "text-center">Update Device</h3>
        }
    }

    changeDescriptionHolder = (event) =>{
        this.setState({description: event.target.value});
    }

    changeLocationHolder = (event) =>{
        this.setState({location: event.target.value});
    }

    changeAvgHolder = (event) =>{
        this.setState({avg: event.target.value});
    }

    changeMaxHolder = (event) =>{
        this.setState({max: event.target.value});
    }

    changeUserIDHolder = (event) =>{
        this.setState({userID: event.target.value});
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
                                        <label>Location:</label>
                                        <input placeholder="Location" description="location" className="form-control"
                                                value={this.state.location} onChange={this.changeLocationHolder}/>
                                    </div>

                                    <div className ="form-group">
                                        <label>AVG:</label>
                                        <input placeholder="AVG" description="avg" className="form-control"
                                                value={this.state.avg} onChange={this.changeAvgHolder}/>
                                    </div>

                                    <div className ="form-group">
                                        <label>MAX:</label>
                                        <input placeholder="MAX" description="max" className="form-control"
                                                value={this.state.max} onChange={this.changeMaxHolder}/>
                                    </div>

                                    <div className ="form-group">
                                        <label>userID:</label>
                                        <input placeholder="userID" description="userID" className="form-control"
                                                value={this.state.userID} onChange={this.changeUserIDHolder}/>
                                    </div>
                                    
                                    <br></br>
                                    
                                    <button className="btn btn-success" onClick={this.saveDevice}>Save</button>
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

export default AddDeviceComponent;