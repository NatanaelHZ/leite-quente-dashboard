import axios from 'axios';

const { token } = JSON.parse(localStorage.getItem('user'));

export default axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    'Content-type': 'application/json',
    'x-access-token': token
  }
});
