const express = require('express');
const router = express.Router();

// Import route files
const authRoutes = require('./auth');
const jobRoutes = require('./jobs');

// Use routes
router.use('/auth', authRoutes);
router.use('/jobs', jobRoutes);

module.exports = router;