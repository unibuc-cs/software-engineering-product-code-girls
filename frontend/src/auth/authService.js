import axios from 'axios';

const API_URL = 'http://localhost:8081';

export const login = async (credentials) => {
  try {
    console.log("Login data: ", credentials); 
    const response = await axios.post(`${API_URL}/users/login`, credentials);
    console.log(response.data);
    if (response.data) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      return response.data;
    } else {
      throw new Error("Authentication failed!");
    }
  } catch (error) {
    if (error.response) {
      throw new Error(error.response?.data?.message || 'Authentication failed!');
    } else {
      console.error("Error during login:", error);
      throw new Error('An unexpected error occurred during login!');
    }
  }
};

export const logout = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    console.warn("No refresh token found. Logging out locally.");
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return;
  }

  try {
    const response = await axios.post(`${API_URL}/users/logout`, { token: refreshToken });
    console.log("Logout successful:", response.data.message);
  } catch (error) {
    console.error("Error during logout:", error.response?.data || error.message);
  } finally {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
};


export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) throw new Error('No refresh token available');

  try {
    const response = await axios.post(`${API_URL}/users/refresh`, { token: refreshToken });
    localStorage.setItem('accessToken', response.data.accessToken);
    return response.data.accessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw new Error('Failed to refresh access token');
  }
};
