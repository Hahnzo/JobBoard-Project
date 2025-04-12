const express = require('express');
const router = express.Router();

// Import route files
const authRoutes = require('./auth');

// Use routes
router.use('/auth', authRoutes);

module.exports = router; 