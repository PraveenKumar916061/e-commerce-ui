import axios from "axios";

export default axios.create({
  baseURL: 'http://localhost:8085', 
  timeout: 10000,
  headers: {'Content-Type': 'application/json'} // Default headers if needed
});



axios.interceptors.request.use(
  (config) => {
    // Get the token from LocalStorage
    const token = localStorage.getItem('authToken'); // Use the key you chose

    // If the token exists, add it to the Authorization header
    if (token) {
      // Common practice is to use the 'Bearer' scheme
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // **Important:** Return the config object so the request can proceed
    return config;
  },
  (error) => {
    // Handle request errors here (e.g., network issues before sending)
    // This is less common for simple token injection but useful for logging or other setup errors
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Optional: Add a response interceptor (useful for global error handling like 401)
axios.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx causes this function to trigger
    // Do something with response data

    const token = response?.data?.token;

    if (token) {
      // Store the token in LocalStorage
      localStorage.setItem('authToken', token); // Use the same key as in the interceptor
      console.log('Login successful, token stored.', token);
    }
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx causes this function to trigger
    // Do something with response error
    if (error.response && error.response.status === 401) {
      // Example: Unauthorized - Token might be invalid or expired
      console.error('Unauthorized! Logging out.');
      // Clear the token
      localStorage.removeItem('authToken');
      // Optionally redirect to login page
      // window.location.href = '/login';
      // Or trigger a logout action in your state management
    }
    // **Important:** Reject the promise so the error propagates to your .catch() blocks
    return Promise.reject(error);
  }
);
