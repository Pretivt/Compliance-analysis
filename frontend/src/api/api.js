import axios from 'axios';

// Create an axios instance
const api = axios.create({
baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : 'http://localhost:5000/api',

  // baseURL: 'http://localhost:5000/api', // Adjusted to match typical API structure
  withCredentials: true, // Required for cookies  //token hai tabhi req jayegi
});
// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Global error handling
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error:', error.response.data.message || error.message);
    } else if (error.request) {
      
      console.error('Network Error: No response received');
    } else {
      
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
