import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));
const accesstoken = user && user.accessToken;

export default axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-type': 'application/json',
    'x-access-token': accesstoken
  }
});
