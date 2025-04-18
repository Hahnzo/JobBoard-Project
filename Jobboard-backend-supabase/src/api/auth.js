import apiClient, { setAuthToken } from './client';

export const register = (userData) => {
  return apiClient.post('/auth/register', userData);
};

export const login = async (credentials) => {
  const response = await apiClient.post('/auth/login', credentials);
  if (response.data.token) {
    setAuthToken(response.data.token);
  }
  return response;
};

export const logout = () => {
  setAuthToken(null);
  return apiClient.post('/auth/logout');
};

export const getProfile = () => {
  return apiClient.get('/auth/profile');
};

export const updateProfile = (userData) => {
  return apiClient.put('/auth/profile', userData);
};