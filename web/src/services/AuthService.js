import axios from 'axios';

const API_URL = 'http://localhost:8080/';

class AuthService {
  static async login(email, password) {
    return axios.post(`${API_URL}auth/login`, {
      email,
      password
    }).then((res) => {
      if (res.data.accessToken) {
        console.log(JSON.stringify(res.data));
        localStorage.setItem('user', JSON.stringify(res.data));
      }

      return res.data;
    });
  }

  static async logout() {
    localStorage.removeItem('user');
  }

  static async register(email, password) {
    return axios.post(`${API_URL}signup`, {
      email,
      password
    });
  }

  static async getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default AuthService;
