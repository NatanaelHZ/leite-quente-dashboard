import axios from 'axios';
import authHeader from './AuthHeader';

const API_URL = 'http://localhost:8080/api/test/';

module.exports = class UserService {
  static async getPublicContent() {
    return axios.get(`${API_URL}all`);
  }

  static async getUserBoard() {
    return axios.get(`${API_URL}user`, { headers: authHeader() });
  }

  static async getModeratorBoard() {
    return axios.get(`${API_URL}mod`, { headers: authHeader() });
  }

  static async getAdminBoard() {
    return axios.get(`${API_URL}admin`, { headers: authHeader() });
  }
};
