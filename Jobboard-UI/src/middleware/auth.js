const AuthService = require('../services/AuthService');

// Middleware to verify JWT token and add user to request
const authenticate = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decoded = AuthService.verifyToken(token);
    
    // Add user info to request
    req.user = decoded;
    
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed: ' + error.message });
  }
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ error: 'Access denied: Admin role required' });
  }
};

// Middleware to check if user is company
const isCompany = (req, res, next) => {
  if (req.user && (req.user.role === 'company' || req.user.role === 'admin')) {
    next();
  } else {
    return res.status(403).json({ error: 'Access denied: Company role required' });
  }
};

module.exports = {
  authenticate,
  isAdmin,
  isCompany
};