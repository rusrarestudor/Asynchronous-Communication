import axios from 'axios';

const config = {
    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.accessToken}` }
};

const USER_API = "https://a2raresback.herokuapp.com/user"


class UserService{

    getUsers(){
        return axios.get(USER_API, config);
    }

    addUser(user){
        return axios.post(USER_API, user, config);
    }

    getUserById(userId){
        return axios.get(`${USER_API}/${userId}`, config);
    }

    updateUser(userId, user){
        return axios.put(`${USER_API}/${userId}`, user, config);
    }

    deleteUser(userId){
        return axios.delete(`${USER_API}/${userId}`, config);
    }

    getUserCurrC(userId){
        return axios.get(`${USER_API}/curc/${userId}`, config);
    }

    getUserHistC(userId, mounth, day){
        console.log("casadasdasdasda");
        return axios.get(`${USER_API}/histc/${userId}/${mounth}/${day}`, config);
    }

    getAdminPage(){
        
    }

}

export default new UserService()