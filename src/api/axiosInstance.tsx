// src/api/axiosInstance.tsx
import axios from 'axios';
import type{ InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// 1. Determine the Base URL dynamically
// If running locally, Vite pulls from .env.development -> http://127.0.0.1:8000/api/
// If running in production, Vite pulls from .env.production -> https://api.cliquemambas.org/api/
const BASE_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api/` 
  : 'https://api.cliquemambas.org/api/'; // Safe local default fallback

const axiosInstance = axios.create({
  baseURL: BASE_URL,  
  timeout: 5000, // 5-second request timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// --- Request Interceptor ---
// Runs BEFORE every request to attach the JWT Access Token if it's stored
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('access_token'); 
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; 
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Custom interface to extend AxiosRequestConfig so TypeScript allows our custom _retry flag
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// --- Response Interceptor ---
// Runs AFTER a response is received to catch 401 Unauthorized errors and refresh tokens
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response, 
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig; 

    // Conditions to attempt token refresh:
    // 1. Error status is 401 (Unauthorized)
    // 2. The request hasn't been retried yet (prevents loops)
    // 3. The request isn't the refresh endpoint itself
    if (
      error.response && 
      error.response.status === 401 && 
      originalRequest &&
      !originalRequest._retry && 
      originalRequest.url && 
      originalRequest.url.indexOf('auth/token/refresh/') === -1
    ) {
      originalRequest._retry = true; 

      const refreshToken = localStorage.getItem('refresh_token'); 

      if (refreshToken) {
        try {
          // Uses the instance relative path so it automatically goes to localhost or production
          const response = await axiosInstance.post('auth/token/refresh/', {
            refresh: refreshToken,
          });
          
          // Store the new working access token
          localStorage.setItem('access_token', response.data.access);
          
          // Inject the new token into the failed original request and re-send it
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
          }
          
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // If the refresh token is also invalid/expired, log out completely
          console.error('Refresh token failed. Logging out...', refreshError);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          return Promise.reject(refreshError); 
        }
      } else {
        console.warn('No refresh token found. User needs to log in again.');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;