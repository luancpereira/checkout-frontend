import axios from 'axios';
import { authService } from './authService';

const api = axios.create({
  baseURL: 'http://localhost:9000/api',
});

api.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    
    if (token) {
      if (authService.isAuthenticated()) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        window.location.href = '/login';
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      authService.logout();
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;