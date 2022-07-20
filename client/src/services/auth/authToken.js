import AuthService from "../AuthService";
import axios from 'axios';

export const axiosAuth = axios.create({ 
    headers: { 
      Authorization: AuthService.getCurrentUserToken()
    } 
  });