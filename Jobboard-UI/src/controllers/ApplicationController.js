const Application = require('../models/Application');
const Job = require('../models/Job');
const Company = require('../models/Company');
const User = require('../models/User');

class ApplicationController {
  static async submitApplication(req, res) {
    try {
      const { jobId, firstName, lastName, email, phone, coverLetter, portfolioUrl } = req.body;
      const userId = req.user ? req.user.id : null;
      
      // Validate required fields
      if (!jobId || !firstName || !lastName || !email) {
        return res.status(400).json({ error: 'Required fields missing' });
      }
      
      // Check if job exists
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ error: 'Job not found' });
      }
      
      // Create application
      const application = await Application.createApplication({
        jobId,
        userId,
        firstName,
        lastName,
        email,
        phone,
        coverLetter,
        portfolioUrl,
        resumeFile: req.file
      });
      
      return res.status(201).json(application);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  static async getApplicationsByUser(req, res) {
    try {
      const userId = req.user.id;
      const applications = await Application.getApplicationsByUserId(userId);
      
      return res.status(200).json(applications);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  static async getApplicationsByJob(req, res) {
    try {
      const jobId = req.params.jobId;
      const userId = req.user.id;
      
      // Check if job exists
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ error: 'Job not found' });
      }
      
      // Check if the user is associated with the company that posted the job
      const company = await Company.findByUserId(userId);
      if (!company || (job.company_id !== company.id && req.user.role !== 'admin')) {
        return res.status(403).json({ error: 'Not authorized to view these applications' });
      }
      
      const applications = await Application.getApplicationsByJobId(jobId);
      
      return res.status(200).json(applications);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  static async updateApplicationStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const userId = req.user.id;
      
      if (!status || !['pending', 'reviewed', 'interviewed', 'rejected', 'accepted'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }
      
      // Get the application
      const applications = await Application.getApplicationsByJobId(null);
      const application = applications.find(app => app.id.toString() === id);
      
      if (!application) {
        return res.status(404).json({ error: 'Application not found' });
      }
      
      // Check if the user is associated with the company that posted the job
      const job = await Job.findById(application.job_id);
      const company = await Company.findByUserId(userId);
      
      if (!company || (job.company_id !== company.id && req.user.role !== 'admin')) {
        return res.status(403).json({ error: 'Not authorized to update this application' });
      }
      
      const updatedApplication = await Application.updateApplicationStatus(id, status);
      
      return res.status(200).json(updatedApplication);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ApplicationController;