const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

// Rate limiting middleware for login attempts
const loginLimiter = rateLimit({
  windowMs: parseInt(process.env.LOCKOUT_TIME) * 60 * 1000, // 15 minutes default
  max: parseInt(process.env.MAX_LOGIN_ATTEMPTS) || 5, // 5 attempts per window
  message: {
    error: 'Too many login attempts, please try again later.',
    retryAfter: parseInt(process.env.LOCKOUT_TIME) || 15
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Custom key generator to track by IP
  keyGenerator: (req) => req.ip,
  // Skip successful requests
  skipSuccessfulRequests: true
});

// JWT token verification middleware
const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired. Please login again.',
        code: 'TOKEN_EXPIRED'
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token.',
        code: 'INVALID_TOKEN'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Token verification failed.'
    });
  }
};

// Admin role verification middleware
const verifyAdmin = (req, res, next) => {
  if (!req.admin || (req.admin.role !== 'admin' && req.admin.role !== 'super-admin')) {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.'
    });
  }
  next();
};

// Security headers middleware
const securityHeaders = (req, res, next) => {
  // Remove X-Powered-By header
  res.removeHeader('X-Powered-By');
  
  // Add security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // CORS headers for admin routes
  if (req.path.startsWith('/api/admin')) {
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }
  
  next();
};

// Input validation middleware
const validateLoginInput = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required.'
    });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.'
    });
  }

  // Password strength validation
  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 8 characters long.'
    });
  }

  next();
};

module.exports = {
  loginLimiter,
  verifyToken,
  verifyAdmin,
  securityHeaders,
  validateLoginInput
};