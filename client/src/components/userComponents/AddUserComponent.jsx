import React, { Component } from 'react';
import UserService from '../../services/UserService';

class AddUserComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            email:'',
            password: '',
            birthdate: '',
            address: '',
        }

        this.changeNameHolder = this.changeNameHolder.bind(this);
        this.changeEmailHolder = this.changeEmailHolder.bind(this);
        this.changePasswordHolder = this.changePasswordHolder.bind(this);
        this.changeBirthdateHolder = this.changeBirthdateHolder.bind(this);
        this.changeAddressHolder = this.changeAddressHolder.bind(this);
        this.saveUser = this.saveUser.bind(this);

    }

    componentDidMount(){

        if( this.state.id < 0 ){
            return
        }else{
            UserService.getUserById(this.state.id).then( (res) => {
                let u = res.data;
                this.setState({
                    name: u.name,
                    email: u.email,
                    password: u.password,
                    birthdate: u.birthdate,
                    address: u.address,
                });
            });
        }
    }

    saveUser = (e) => {
        e.preventDefault();

        let user = {name: this.state.name, email: this.state.email, password: this.state.password, birthdate: this.state.birthdate, address: this.state.address};
        console.log('user = ' + JSON.stringify(user));

        if( this.state.id === -1 ){
            UserService.addUser(user).then(res => {
                this.props.history.push('/users');
            });
        }else{
            UserService.updateUser(this.state.id, user).then( (res) => {
                this.props.history.push('/users');
            });
        }
    }

    cancel(){
        this.props.history.push('/users');
    }

    getTitle(){
        if( this.state.id == -1 ){
            return <h3 className = "text-center">Add Client</h3>
        }else{
            return <h3 className = "text-center">Update Client</h3>
        }
    }

    changeNameHolder = (event) =>{
        this.setState({name: event.target.value});
    }

    changeEmailHolder = (event) =>{
        this.setState({email: event.target.value});
    }

    changePasswordHolder = (event) =>{
        this.setState({password: event.target.value});
    }

    changeBirthdateHolder = (event) =>{
        this.setState({birthdate: event.target.value});
    }

    changeAddressHolder = (event) =>{
        this.setState({address: event.target.value});
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "container">
                    <div className = "row">
                        <div className="card col-md-6 offset-md-4 offset-md-4">
                            { this.getTitle() }
                            <div className="card-body">
                                <form>
                                    <div className ="form-group">
                                        <label>Name:</label>
                                        <input placeholder="Name" name="name" className="form-control"
                                                value={this.state.name} onChange={this.changeNameHolder}/>
                                    </div>

                                    <div className ="form-group">
                                        <label>Email:</label>
                                        <input placeholder="Email" name="email" className="form-control"
                                                value={this.state.email} onChange={this.changeEmailHolder}/>
                                    </div>

                                    <div className ="form-group">
                                        <label>Password:</label>
                                        <input placeholder="Password" name="password" className="form-control"
                                                value={this.state.password} onChange={this.changePasswordHolder}/>
                                    </div>

                                    <div className ="form-group">
                                        <label>Birthdate:</label>
                                        <input placeholder="Birthdate" name="birthdate" className="form-control"
                                                value={this.state.birthdate} onChange={this.changeBirthdateHolder}/>
                                    </div>

                                    <div className ="form-group">
                                        <label>Address:</label>
                                        <input placeholder="Address" name="address" className="form-control"
                                                value={this.state.address} onChange={this.changeAddressHolder}/>
                                    </div>
                                    
                                    <br></br>
                                    
                                    <button className="btn btn-success" onClick={this.saveUser}>Save</button>
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

export default AddUserComponent;