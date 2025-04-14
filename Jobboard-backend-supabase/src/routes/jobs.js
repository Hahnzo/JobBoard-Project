const express = require('express');
const router = express.Router();
const JobController = require('../controllers/JobController');
const { authenticate, isCompany } = require('../middleware/auth');

// Public routes
router.get('/', JobController.getAllJobs);
router.get('/:id', JobController.getJobById);

// Protected routes (company only)
router.post('/', authenticate, isCompany, JobController.createJob);
router.put('/:id', authenticate, isCompany, JobController.updateJob);
router.delete('/:id', authenticate, isCompany, JobController.deleteJob);

module.exports = router;