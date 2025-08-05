import axios from "../configuration/config"

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post('/api/users/login', credentials, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.data?.token) {
      localStorage.setItem('authToken', response.data.token);
      console.log("User logged in successfully");
      return response.data;
    }
    throw new Error('No authentication token received');
  } catch (error) {
    if (error.response?.status === 403) {
      throw new Error('Invalid email or password');
    }
    throw new Error(error.response?.data?.message || 'Login failed. Please try again.');
  }
};

export const logoutUser = () => {
    // Remove the token from LocalStorage
    localStorage.removeItem('authToken');
    // Optional: Remove the header from the default instance configuration
    // if you had set it explicitly (usually not needed if relying solely on interceptor)
    // delete apiClient.defaults.headers.common['Authorization'];
    console.log('User logged out, token removed.');
    // Add redirection or state update logic here
};

export const registerUser = async(userData) => {
  try {
    const userResponse = await axios.post('/api/users/create-user', userData);
    return userResponse.data;
  } catch(error) {
    console.log('Registration failed...', error.response ? error.response.data : error.message);
    throw error;
  }
};