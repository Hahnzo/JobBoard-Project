// Job interface
export interface Job {
  id?: number;
  title: string;
  description: string;
  companyName: string;
  companyId?: number;
  jobType: string;
  location: string;
  salaryRange: string;
  experienceLevel: string;
  skills: string[];
  createdAt?: Date;
}

const API_URL = 'http://localhost:3001/api';

// Create a new job posting
export async function createJob(jobData: Job): Promise<Job> {
  console.log('APIURL',API_URL)
  const response = await fetch(`${API_URL}/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(jobData),
  });

  if (!response.ok) {
    throw new Error('Failed to create job posting');
  }

  return response.json();
}

// Get all jobs with optional filters
export async function getAllJobs(params?: {
  search?: string;
  jobType?: string;
  location?: string;
  experienceLevel?: string;
  page?: number;
  pageSize?: number;
}): Promise<{ jobs: Job[]; totalCount: number; page: number; pageSize: number }> {
  const queryParams = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, value.toString());
    });
  }

  const response = await fetch(`${API_URL}/jobs?${queryParams}`);
  if (!response.ok) {
    throw new Error('Failed to fetch jobs');
  }

  return response.json();
}

// Get a specific job by ID
export async function getJobById(id: string): Promise<Job> {
  const response = await fetch(`${API_URL}/jobs/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch job');
  }

  return response.json();
}

// Update a job posting
export async function updateJob(id: string, jobData: Partial<Job>): Promise<Job> {
  const response = await fetch(`${API_URL}/jobs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(jobData),
  });

  if (!response.ok) {
    throw new Error('Failed to update job');
  }

  return response.json();
}

// Delete a job posting
export async function deleteJob(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/jobs/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete job');
  }
}