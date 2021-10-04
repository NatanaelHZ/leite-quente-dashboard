import axios from 'axios';

const API_URL = 'http://localhost:8080/';

export async function login(email, password) {
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

export function logout() {
  localStorage.removeItem('user');
}

export async function register(email, password) {
  return axios.post(`${API_URL}signup`, {
    email,
    password
  });
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'));
}

export function getCurrentUserEmail() {
  const user = JSON.parse(localStorage.getItem('user'));

  return user?.email || 'Usuário';
}

export function isLoggedIn() {
  const user = JSON.parse(localStorage.getItem('user'));

  return user?.success || false;
}
