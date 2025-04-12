const Job = require('../models/Job');
const Company = require('../models/Company');

class JobController {
  static async createJob(req, res) {
    try {
      const userId = req.user.id;
      const { 
        title, description, jobType, location, 
        salaryRange, experienceLevel, skills 
      } = req.body;
      
      // Validate required fields
      if (!title || !description || !jobType) {
        return res.status(400).json({ error: 'Required fields missing' });
      }
      
      // Get company associated with the user
      const company = await Company.findByUserId(userId);
      if (!company) {
        return res.status(400).json({ error: 'User is not associated with a company' });
      }
      
      // Create job
      const job = await Job.createJob({
        title,
        description,
        companyId: company.id,
        jobType,
        location,
        salaryRange,
        experienceLevel,
        skills: skills || []
      });
      
      return res.status(201).json(job);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  static async getAllJobs(req, res) {
    try {
      const { 
        search, jobType, location, experienceLevel,
        page, pageSize 
      } = req.query;
      
      const { data, count } = await Job.getAllJobs({
        search,
        jobType,
        location,
        experienceLevel,
        page: parseInt(page) || 1,
        pageSize: parseInt(pageSize) || 10
      });
      
      return res.status(200).json({
        jobs: data,
        totalCount: count,
        page: parseInt(page) || 1,
        pageSize: parseInt(pageSize) || 10
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  static async getJobById(req, res) {
    try {
      const jobId = req.params.id;
      const job = await Job.findById(jobId);
      
      if (!job) {
        return res.status(404).json({ error: 'Job not found' });
      }
      
      return res.status(200).json(job);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  static async updateJob(req, res) {
    try {
      const jobId = req.params.id;
      const userId = req.user.id;
      
      // Get job to verify ownership
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ error: 'Job not found' });
      }
      
      // Get user's company
      const company = await Company.findByUserId(userId);
      if (!company || (job.company_id !== company.id && req.user.role !== 'admin')) {
        return res.status(403).json({ error: 'Not authorized to update this job' });
      }
      
      // Update job
      const { 
        title, description, jobType, location, 
        salaryRange, experienceLevel, skills 
      } = req.body;
      
      const updatedJob = await Job.updateJob(jobId, {
        title,
        description,
        job_type: jobType,
        location,
        salary_range: salaryRange,
        experience_level: experienceLevel,
        skills
      });
      
      return res.status(200).json(updatedJob);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  static async deleteJob(req, res) {
    try {
      const jobId = req.params.id;
      const userId = req.user.id;
      
      // Get job to verify ownership
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ error: 'Job not found' });
      }
      
      // Get user's company
      const company = await Company.findByUserId(userId);
      if (!company || (job.company_id !== company.id && req.user.role !== 'admin')) {
        return res.status(403).json({ error: 'Not authorized to delete this job' });
      }
      
      // Delete job
      await Job.deleteJob(jobId);
      
      return res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = JobController;