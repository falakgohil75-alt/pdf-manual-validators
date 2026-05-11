const User = require('../models/User');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign(
    { userId, timestamp: Date.now() },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '24h' }
  );
};

// Register new user
exports.register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, college, department, phone } = req.body;

    // Validation
    if (!email || !password || !firstName || !lastName || !college) {
      return res.status(400).json({
        error: true,
        message: 'Missing required fields'
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        error: true,
        message: 'User already exists'
      });
    }

    // Create new user
    const user = new User({
      email,
      password,
      firstName,
      lastName,
      college,
      department,
      phone,
      role: 'teacher'
    });

    await user.save();
    logger.info(`New user registered: ${email}`);

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      error: false,
      message: 'User registered successfully',
      token,
      user: user.toJSON()
    });
  } catch (error) {
    logger.error('Register error:', error);
    res.status(500).json({
      error: true,
      message: error.message || 'Registration failed'
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        error: true,
        message: 'Email and password are required'
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: true,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: true,
        message: 'Invalid email or password'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id);
    logger.info(`User logged in: ${email}`);

    res.json({
      error: false,
      message: 'Login successful',
      token,
      user: user.toJSON()
    });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({
      error: true,
      message: error.message || 'Login failed'
    });
  }
};

// Logout user
exports.logout = async (req, res) => {
  try {
    logger.info(`User logged out: ${req.user.userId}`);
    res.json({
      error: false,
      message: 'Logout successful'
    });
  } catch (error) {
    logger.error('Logout error:', error);
    res.status(500).json({
      error: true,
      message: 'Logout failed'
    });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        error: true,
        message: 'User not found'
      });
    }

    res.json({
      error: false,
      user: user.toJSON()
    });
  } catch (error) {
    logger.error('Get current user error:', error);
    res.status(500).json({
      error: true,
      message: 'Failed to fetch user'
    });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, department, phone, profileImage } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      {
        firstName,
        lastName,
        department,
        phone,
        profileImage,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );

    logger.info(`User profile updated: ${req.user.userId}`);

    res.json({
      error: false,
      message: 'Profile updated successfully',
      user: user.toJSON()
    });
  } catch (error) {
    logger.error('Update profile error:', error);
    res.status(500).json({
      error: true,
      message: 'Failed to update profile'
    });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        error: true,
        message: 'User not found'
      });
    }

    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: true,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    logger.info(`User password changed: ${req.user.userId}`);

    res.json({
      error: false,
      message: 'Password changed successfully'
    });
  } catch (error) {
    logger.error('Change password error:', error);
    res.status(500).json({
      error: true,
      message: 'Failed to change password'
    });
  }
};

// Refresh token
exports.refreshToken = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        error: true,
        message: 'Token is required'
      });
    }

    const decoded = jwt.decode(token);
    if (!decoded) {
      return res.status(401).json({
        error: true,
        message: 'Invalid token'
      });
    }

    const newToken = generateToken(decoded.userId);

    res.json({
      error: false,
      message: 'Token refreshed successfully',
      token: newToken
    });
  } catch (error) {
    logger.error('Refresh token error:', error);
    res.status(500).json({
      error: true,
      message: 'Failed to refresh token'
    });
  }
};

// Verify email (placeholder)
exports.verifyEmail = async (req, res) => {
  try {
    res.json({ error: false, message: 'Email verification sent' });
  } catch (error) {
    res.status(500).json({ error: true, message: 'Verification failed' });
  }
};

// Forgot password (placeholder)
exports.forgotPassword = async (req, res) => {
  try {
    res.json({ error: false, message: 'Password reset link sent to email' });
  } catch (error) {
    res.status(500).json({ error: true, message: 'Failed to process request' });
  }
};

// Reset password (placeholder)
exports.resetPassword = async (req, res) => {
  try {
    res.json({ error: false, message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ error: true, message: 'Failed to reset password' });
  }
};
