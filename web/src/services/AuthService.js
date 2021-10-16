import axios from 'axios';

const API_URL = 'http://localhost:8080/';

export async function login(email, password) {
  return axios.post(`${API_URL}auth/login`, {
    email,
    password
  }).then((res) => {
    if (res.data.data) {
      localStorage.setItem('user', JSON.stringify(res.data.data));
    }

    return res.data.data;
  });
}

export function logout() {
  localStorage.removeItem('user');
}

export async function register(email, password) {
  return axios.post(`${API_URL}auth/register`, {
    email,
    password
  });
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'));
}

export function getCurrentUserEmail() {
  const has = Object.prototype.hasOwnProperty;

  const user = JSON.parse(localStorage.getItem('user'));

  if (has.call(user, 'email')) {
    return user.email;
  }

  return 'faça login';
}

export function isLoggedIn() {
  const has = Object.prototype.hasOwnProperty;

  const user = JSON.parse(localStorage.getItem('user'));

  if (has.call(user, 'token')) {
    return user.token;
  }

  return false;
}
