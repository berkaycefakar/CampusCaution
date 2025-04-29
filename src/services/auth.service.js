import axios from 'axios';
import { API_URL } from '../config/config';

class AuthService {
  async login(username, password) {
    const response = await axios.post(API_URL + '/auth/login', {
      username,
      password
    });
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  register(username, email, password) {
    return axios.post(API_URL + '/auth/register', {
      username,
      email,
      password
    });
  }
}

export default new AuthService(); 