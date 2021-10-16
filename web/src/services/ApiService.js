import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));
const accesstoken = user && user.token;

export default axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    'Content-type': 'application/json',
    'x-access-token': accesstoken
  }
});
