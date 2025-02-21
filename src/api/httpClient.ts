import { LoginResponse } from '@/types/LoginResponse';
import axios from 'axios';
import Cookies from 'js-cookie';

export const client = axios.create({
  baseURL: 'https://car-assistant-app.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (data: LoginResponse | null) => {
  if (data) {
    client.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    localStorage.setItem('token', data.token);
    localStorage.setItem('name', data.firsfName + ' ' + data.lastName);
    Cookies.set('token', data.token, { expires: 7 });
  } else {
    delete client.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    Cookies.remove('token');
  }
};
