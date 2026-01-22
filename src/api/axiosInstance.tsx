// src/api/axiosInstance.js
import axios from 'axios';

// Create a custom Axios instance
const axiosInstance = axios.create({
  // **IMPORTANT: Replace with your actual Django API base URL**
  // This should be the address where your Django backend is running.
  baseURL: import.meta.env.VITE_API_URL 
    ? `${import.meta.env.VITE_API_URL}/api/` 
    : 'http://localhost:8000/api/',  
  timeout: 5000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// --- Request Interceptor ---
// This runs BEFORE every request is sent.
// Its purpose is to attach the JWT Access Token to the Authorization header
// if it exists in localStorage.
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token'); // Get the current access token
    if (token) {
      // If a token exists, set the Authorization header using the Bearer scheme
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; // Return the modified config to continue the request
  },
  (error) => {
    // Handle request errors (e.g., network issues)
    return Promise.reject(error);
  }
);

// --- Response Interceptor ---
// This runs AFTER a response is received.
// Its primary purpose is to handle 401 (Unauthorized) errors,
// specifically to try and refresh the access token using the refresh token.
axiosInstance.interceptors.response.use(
  (response) => response, // If the response is successful (2xx status), just pass it through
  async (error) => {
    const originalRequest = error.config; // Get the original request that received the error

    // Conditions to attempt token refresh:
    // 1. Error status is 401 (Unauthorized)
    // 2. The request hasn't been retried yet (to prevent infinite loops)
    // 3. The request is NOT for the token refresh endpoint itself (to prevent recursion)
    if (error.response && error.response.status === 401 && !originalRequest._retry && originalRequest.url.indexOf('auth/token/refresh/') === -1) {
      originalRequest._retry = true; // Mark this request as retried

      const refreshToken = localStorage.getItem('refresh_token'); // Get the refresh token

      if (refreshToken) {
        try {
          // Attempt to get a new access token using the refresh token
          const response = await axios.post('http://localhost:8000/api/auth/token/refresh/', {
            refresh: refreshToken,
          });
          
          // Store the new access token in localStorage
          localStorage.setItem('access_token', response.data.access);
          
          // Update the Authorization header of the original failed request
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
          
          // Re-send the original request with the new access token
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // If refreshing token fails (e.g., refresh token expired or invalid),
          // log out the user by clearing all tokens.
          console.error('Refresh token failed. Logging out...', refreshError);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          
          // **IMPORTANT:** You should also redirect the user to the login page here.
          // This often requires using a history/navigate object if not within a component.
          // For simplicity, a direct window.location.href might work, but it's less React-idiomatic.
          // You might need to add a global event or update AuthContext to trigger navigation.
          // Example (if AuthContext's logout is available globally, which it is):
          // You would need to import { AuthContext } from '../context/AuthContext';
          // and use AuthContext.Provider's value or a global event emitter to trigger logout.
          // For now, simple clear localStorage and reject:
          // window.location.href = '/admin-login'; // Direct redirect (might cause full page reload)
          return Promise.reject(refreshError); // Reject the promise to indicate failure
        }
      } else {
        // No refresh token found, meaning user cannot re-authenticate automatically.
        // Clear any remaining access token and prompt for re-login.
        console.warn('No refresh token found. User needs to log in again.');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        // window.location.href = '/admin-login'; // Redirect to login
      }
    }
    // For all other errors (non-401, already retried, or refresh token endpoint errors),
    // just reject the promise to propagate the error to the calling component.
    return Promise.reject(error);
  }
);

export default axiosInstance;