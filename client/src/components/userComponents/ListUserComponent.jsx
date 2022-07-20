import React, { Component } from 'react';
import UserService from '../../services/UserService';
import AuthService from "../../services/AuthService";

class ListUserComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
                users: [],
                isAdmin: false,
                currentUser: AuthService.getCurrentUser()
        }
        this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        
    }

    componentDidMount(){
        UserService.getUsers().then((res) => {
            this.setState({users: res.data});
        });
        
        const user = AuthService.getCurrentUser();
        if(user){
        this.setState({
            curentUser: user,
            isAdmin: user.role.includes("ADMIN")
        });
      
    }
    }

    editUser(id){
        this.props.history.push(`/add-user/${id}`);
    }

    addUser(){
        this.props.history.push('/add-user/-1');
    }

    deleteUser(id){
        UserService.deleteUser(id).then( res => {
            this.setState({users: this.state.users.filter(user => user.id != id)});
        });
    }

    render() {
        const { currentUser } = this.state;

        return (
            <div>
                <h2 className="text-center">Clients</h2>
                <br></br>
                {(currentUser.role == "ADMIN") && (
                <div className= "row">
                    <button className="btn btn-primary" onClick={this.addUser}>Add Client</button>
                </div>)}
                <div className= "row">
                    <table className = "table table-striped table-bordered">

                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Birthdate</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>
                            {
                                this.state.users.map(
                                    user => 
                                    <tr key = {user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.birthdate}</td>
                                        <td>{user.email}</td>
                                        <td>{user.address}</td>
                                        {(currentUser.role == "ADMIN") && (
                                        <td>
                                            <button onClick={ () => this.editUser(user.userID)} className="btn btn-info">Update </button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.deleteUser(user.userID)} className="btn btn-danger">Delete </button>
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

export default ListUserComponent;