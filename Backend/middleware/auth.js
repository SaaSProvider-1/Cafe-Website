const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendResponse } = require('../utils/responseHandler');
const logger = require('../utils/logger');

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    let token;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7); // Remove 'Bearer ' prefix
    }

    // Check if token exists
    if (!token) {
      return sendResponse(res, 401, 'fail', 'Access denied. No token provided.');
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from database
      const user = await User.findById(decoded.id).select('-password -refreshTokens');

      if (!user) {
        return sendResponse(res, 401, 'fail', 'Token is valid but user no longer exists');
      }

      if (!user.isActive) {
        return sendResponse(res, 401, 'fail', 'Your account has been deactivated');
      }

      // Add user to request object
      req.user = user;
      next();
    } catch (jwtError) {
      if (jwtError.name === 'JsonWebTokenError') {
        return sendResponse(res, 401, 'fail', 'Invalid token');
      } else if (jwtError.name === 'TokenExpiredError') {
        return sendResponse(res, 401, 'fail', 'Token expired');
      } else {
        throw jwtError;
      }
    }
  } catch (error) {
    logger.error('Auth middleware error:', error);
    return sendResponse(res, 500, 'error', 'Authentication error');
  }
};

module.exports = authMiddleware;