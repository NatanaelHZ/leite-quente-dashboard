import axios from 'axios';

const API_URL = 'http://localhost:8080/';

class AuthService {
  static async login(email, password) {
    return axios.post(`${API_URL}auth/login`, {
      email,
      password
    }).then((res) => {
      if (res.data.user) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
      }

      return res.data.user;
    });
  }

  static async logout() {
    localStorage.removeItem('user');
  }

  /*  static async register(email, password) {
    return axios.post(`${API_URL}signup`, {
      email,
      password
    });
  } */

  static async getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch (error) {
      return { };
    }
  }

  static async getCurrentUserEmail() {
    const user = JSON.parse(localStorage.getItem('user'));

    return user.email;
  }

  static async isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));

    return user.success;
  }
}

export default AuthService;
