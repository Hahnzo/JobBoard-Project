// src/api/jobs.js
import apiClient from './client';

export const getAllJobs = (params) => {
  return apiClient.get('/jobs', { params });
};

export const getJobById = (id) => {
  return apiClient.get(`/jobs/${id}`);
};

export const createJob = (jobData) => {
  return apiClient.post('/jobs', jobData);
};

export const updateJob = (id, jobData) => {
  return apiClient.put(`/jobs/${id}`, jobData);
};

export const deleteJob = (id) => {
  return apiClient.delete(`/jobs/${id}`);
};