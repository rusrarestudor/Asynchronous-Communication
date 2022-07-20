import axios from "axios";

const API_URL = "https://a2raresback.herokuapp.com/auth/";

class AuthService {
  login(username, password) {
    
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password, role) {
    console.log("o intrat in url" + username)
    return axios.post(API_URL + "signup", {
      username,
      email,
      password, 
      role
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  getCurrentUserToken() {
    if (JSON.parse(localStorage.getItem('user')) == null)
    {
      return ""
    }else{
     return JSON.parse(localStorage.getItem('user')).accessToken
    }
  }
}

export default new AuthService();