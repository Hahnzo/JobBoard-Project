const AuthService = require('../services/AuthService');
const User = require('../models/User');

class AuthController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }
      
      const result = await AuthService.login(email, password);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
  
  static async register(req, res) {
    try {
      const { email, password, firstName, lastName, phone, role } = req.body;
      
      if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({ error: 'Required fields missing' });
      }
      
      const result = await AuthService.register({
        email,
        password,
        firstName,
        lastName,
        phone,
        role
      });
      
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  
  static async getProfile(req, res) {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      
      return res.status(200).json(userWithoutPassword);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  static async updateProfile(req, res) {
    try {
      const userId = req.user.id;
      const { firstName, lastName, phone } = req.body;
      
      const updatedUser = await User.updateUser(userId, {
        first_name: firstName,
        last_name: lastName,
        phone
      });
      
      // Remove password from response
      const { password, ...userWithoutPassword } = updatedUser;
      
      return res.status(200).json(userWithoutPassword);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async validateSession(req, res) {
    try {
      // Check if user is attached to request (from auth middleware)
      if (!req.user || !req.user.id) {
        return res.status(401).json({ 
          error: 'No valid session found',
          isValid: false
        });
      }

      const userId = req.user.id;
      const user = await User.findById(userId);
      
      if (!user) {
        return res.status(404).json({ 
          error: 'User not found',
          isValid: false
        });
      }
      
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      
      return res.status(200).json({
        user: userWithoutPassword,
        isValid: true
      });
    } catch (error) {
      console.error('Session validation error:', error);
      return res.status(401).json({ 
        error: 'Invalid session',
        isValid: false
      });
    }
  }

  static async logout(req, res) {
    try {
      // In a JWT system, the client is responsible for removing the token
      // We just return a success message
      return res.status(200).json({ 
        message: 'Logged out successfully',
        success: true
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = AuthController;