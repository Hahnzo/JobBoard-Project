"use client"

import { useState, useEffect } from "react"
import { Bookmark, MapPin, Building, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Job {
  id: number;
  title: string;
  description: string;
  company: {
    name: string;
    logo_url: string;
  };
  location: string;
  job_type: string;
  experience_level: string;
  salary_range: string;
  created_at: string;
  skills: string[];
}

interface JobsResponse {
  jobs: Job[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export default function JobListings() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    fetchJobs();
  }, [page]);

  const fetchJobs = async () => {
    try {
      const response = await fetch(`/api/jobs?page=${page}&pageSize=${pageSize}`);
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const data: JobsResponse = await response.json();
      setJobs(data.jobs);
      setTotalCount(data.totalCount);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const toggleSaveJob = (id: number) => {
    if (savedJobs.includes(id)) {
      setSavedJobs(savedJobs.filter((jobId) => jobId !== id));
    } else {
      setSavedJobs([...savedJobs, id]);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "entry level":
        return "bg-teal-500 text-white"
      case "junior":
        return "bg-orange-400 text-white"
      case "mid level":
        return "bg-pink-500 text-white"
      case "senior":
        return "bg-green-500 text-white"
      case "principal":
        return "bg-purple-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading jobs...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-8">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>Posted {new Date(job.created_at).toLocaleDateString()}</span>
                </div>
                <button
                  onClick={() => toggleSaveJob(job.id)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <Bookmark className="h-5 w-5" fill={savedJobs.includes(job.id) ? "currentColor" : "none"} />
                </button>
              </div>

              <div className="flex gap-4">
                <div className="h-12 w-12 rounded flex items-center justify-center flex-shrink-0 bg-gray-100">
                  <img 
                    src={job.company.logo_url || "/placeholder.svg"} 
                    alt={`${job.company.name} logo`} 
                    className="h-8 w-8" 
                  />
                </div>

                <div>
                  <h3 className="font-medium text-lg">{job.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{job.company.name}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge className={`rounded-full px-3 py-1 text-xs font-medium ${getLevelColor(job.experience_level)}`}>
                  {job.experience_level}
                </Badge>
                <Badge className="rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 px-3 py-1 text-xs font-medium">
                  {job.salary_range}
                </Badge>
                <Badge className="rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 px-3 py-1 text-xs font-medium">
                  {job.location}
                </Badge>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{job.job_type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{job.location}</span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {job.skills.slice(0, 8).map((skill, index) => (
                  <span key={index} className="text-xs text-gray-500 dark:text-gray-400">
                    #{skill}
                  </span>
                ))}
                {job.skills.length > 8 && <span className="text-xs text-gray-500 dark:text-gray-400">...</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-sm text-gray-700">
          Page {page} of {Math.ceil(totalCount / pageSize)}
        </span>
        <button
          onClick={() => setPage(p => p + 1)}
          disabled={page >= Math.ceil(totalCount / pageSize)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
