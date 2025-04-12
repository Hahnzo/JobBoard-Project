const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');

class AuthService {
  static async login(email, password) {
    // Find user by email
    const user = await User.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }
    
    // Generate JWT token
    const token = this.generateToken(user);
    
    // Return user (without password) and token
    const { password: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token
    };
  }
  
  static async register(userData) {
    // Check if user already exists
    const existingUser = await User.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already in use');
    }
    
    // Create new user
    const newUser = await User.createUser(userData);
    
    // Generate JWT token
    const token = this.generateToken(newUser);
    
    // Return user (without password) and token
    const { password: _, ...userWithoutPassword } = newUser;
    return {
      user: userWithoutPassword,
      token
    };
  }
  
  static generateToken(user) {
    return jwt.sign(
      { 
        id: user.id, 
        email: user.email,
        role: user.role
      },
      config.jwtSecret,
      { expiresIn: '7d' }
    );
  }
  
  static verifyToken(token) {
    try {
      return jwt.verify(token, config.jwtSecret);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}

module.exports = AuthService;