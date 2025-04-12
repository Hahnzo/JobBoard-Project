import apiClient from './client';

export const register = (userData) => {
  return apiClient.post('/auth/register', userData);
};

export const login = (credentials) => {
  return apiClient.post('/auth/login', credentials);
};

export const getProfile = () => {
  return apiClient.get('/auth/profile');
};

export const updateProfile = (userData) => {
  return apiClient.put('/auth/profile', userData);
};