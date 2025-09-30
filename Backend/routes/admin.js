const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Order = require('../models/Order');
const LicenseKeyGenerator = require('../utils/licenseGenerator');
const emailService = require('../utils/emailService');
const { 
  loginLimiter, 
  verifyToken, 
  verifyAdmin, 
  validateLoginInput 
} = require('../middleware/adminAuth');

const router = express.Router();

// Helper function to create JWT token
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '24h',
    issuer: 'cafe-elite-admin',
    audience: 'cafe-elite-frontend'
  });
};

// POST /api/admin/validate-license - Validate license key
router.post('/validate-license', async (req, res) => {
  try {
    const { licenseKey } = req.body;

    if (!licenseKey) {
      return res.status(400).json({
        success: false,
        message: 'License key is required.'
      });
    }

    // Validate license key format
    const validation = LicenseKeyGenerator.validateLicenseKey(licenseKey);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: validation.error
      });
    }

    // Check if admin already exists
    const adminExists = await Admin.adminExists();
    if (adminExists) {
      return res.status(409).json({
        success: false,
        message: 'Admin already exists in the system. Please contact support to reset.',
        code: 'ADMIN_EXISTS'
      });
    }

    // License key is valid and no admin exists
    res.status(200).json({
      success: true,
      message: 'License key is valid. You can now create your admin account.',
      data: {
        licenseKey: licenseKey,
        validated: true
      }
    });

  } catch (error) {
    console.error('License validation error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during license validation.'
    });
  }
});

// POST /api/admin/create-account - Create admin account with validated license
router.post('/create-account', async (req, res) => {
  try {
    const { licenseKey, firstName, lastName, email, password } = req.body;

    // Validate required fields
    if (!licenseKey || !firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.'
      });
    }

    // Validate license key format
    const validation = LicenseKeyGenerator.validateLicenseKey(licenseKey);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid license key.'
      });
    }

    // Check if admin already exists
    const adminExists = await Admin.adminExists();
    if (adminExists) {
      return res.status(409).json({
        success: false,
        message: 'Admin already exists in the system.',
        code: 'ADMIN_EXISTS'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long.'
      });
    }

    // Create admin account
    const adminData = {
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
      licenseKey,
      role: 'super-admin',
      isVerified: true,
      createdBy: 'web-interface'
    };

    const admin = await Admin.createFirstAdmin(adminData);

    // Generate JWT token for immediate login
    const tokenPayload = {
      id: admin._id,
      email: admin.email,
      role: admin.role,
      loginTime: Date.now(),
      ip: req.ip
    };

    const token = generateToken(tokenPayload);

    // Update last login
    await admin.updateLastLogin();

    // Send welcome email
    try {
      const loginUrl = `${process.env.FRONTEND_URL}/admin`;
      await emailService.sendAdminCreatedEmail(admin.email, admin.fullName, loginUrl);
    } catch (emailError) {
      console.log('Failed to send welcome email:', emailError.message);
    }

    // Log admin creation
    console.log(`Admin account created: ${email} at ${new Date().toISOString()}`);

    res.status(201).json({
      success: true,
      message: 'Admin account created successfully!',
      data: {
        token,
        admin: {
          id: admin._id,
          email: admin.email,
          firstName: admin.firstName,
          lastName: admin.lastName,
          fullName: admin.fullName,
          role: admin.role,
          permissions: admin.permissions,
          createdAt: admin.createdAt
        }
      }
    });

  } catch (error) {
    console.error('Admin creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during account creation.'
    });
  }
});

// POST /api/admin/request-license - Request license key for admin creation
router.post('/request-license', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required to request license key.'
      });
    }

    // Check if admin already exists in the system
    const adminExists = await Admin.adminExists();
    if (adminExists) {
      return res.status(409).json({
        success: false,
        message: 'Admin already exists in the system. Only one admin account is allowed.',
        code: 'ADMIN_EXISTS'
      });
    }

    // Generate license key
    const licenseData = LicenseKeyGenerator.createLicenseKeyWithMetadata('standard');
    
    // Send license key via email
    try {
      await emailService.sendLicenseKeyEmail(email, licenseData.licenseKey, licenseData.cliCommand);
      
      // Log the license generation
      console.log(`License key generated and sent to: ${email} at ${new Date().toISOString()}`);
      
      res.status(200).json({
        success: true,
        message: 'License key has been sent to your email address.',
        data: {
          email,
          sentAt: new Date().toISOString(),
          instructions: 'Check your email for the license key and setup instructions.'
        }
      });
    } catch (emailError) {
      console.error('Failed to send license key email:', emailError);
      res.status(500).json({
        success: false,
        message: 'License key generated but failed to send email. Please contact support.',
        error: emailError.message
      });
    }

  } catch (error) {
    console.error('License request error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during license request.'
    });
  }
});

// POST /api/admin/login - Admin login (updated to use database)
router.post('/login', loginLimiter, validateLoginInput, async (req, res) => {
  try {
    const { email, password } = req.body;
    const clientIP = req.ip;

    // Find admin by email
    const admin = await Admin.findOne({ email: email.toLowerCase(), isActive: true });
    
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials.'
      });
    }

    // Check if account is locked
    if (admin.isLocked) {
      return res.status(423).json({
        success: false,
        message: 'Account is temporarily locked due to multiple failed attempts.',
        lockoutUntil: admin.lockUntil
      });
    }

    // Verify password
    const isPasswordValid = await admin.comparePassword(password);
    
    if (!isPasswordValid) {
      // Increment failed login attempts
      await admin.incLoginAttempts();
      
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials.'
      });
    }

    // Reset failed login attempts on successful login
    if (admin.loginAttempts > 0) {
      await admin.resetLoginAttempts();
    }

    // Update last login
    await admin.updateLastLogin();

    // Generate JWT token
    const tokenPayload = {
      id: admin._id,
      email: admin.email,
      role: admin.role,
      loginTime: Date.now(),
      ip: clientIP
    };

    const token = generateToken(tokenPayload);

    // Log successful login
    console.log(`Admin login successful: ${email} from IP: ${clientIP} at ${new Date().toISOString()}`);

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      data: {
        token,
        admin: {
          id: admin._id,
          email: admin.email,
          firstName: admin.firstName,
          lastName: admin.lastName,
          fullName: admin.fullName,
          role: admin.role,
          permissions: admin.permissions,
          lastLogin: admin.lastLogin,
          loginTime: tokenPayload.loginTime
        }
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during login.'
    });
  }
});

// POST /api/admin/verify - Verify token validity
router.post('/verify', verifyToken, verifyAdmin, (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Token is valid.',
      data: {
        admin: {
          id: req.admin.id,
          email: req.admin.email,
          role: req.admin.role,
          loginTime: req.admin.loginTime
        }
      }
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying token.'
    });
  }
});

// POST /api/admin/logout - Admin logout (optional, for logging purposes)
router.post('/logout', verifyToken, verifyAdmin, (req, res) => {
  try {
    // Log logout
    console.log(`Admin logout: ${req.admin.email} from IP: ${req.ip} at ${new Date().toISOString()}`);
    
    res.status(200).json({
      success: true,
      message: 'Logout successful.'
    });
  } catch (error) {
    console.error('Admin logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during logout.'
    });
  }
});

// GET /api/admin/dashboard - Protected dashboard route
router.get('/dashboard', verifyToken, verifyAdmin, async (req, res) => {
  try {
    // Get admin details from database
    const admin = await Admin.findById(req.admin.id).select('-password');
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found.'
      });
    }

    // Get order statistics
    const orderStats = await Order.getOrderStats();
    
    // Get recent orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('orderNumber customerInfo totalAmount status createdAt');

    res.status(200).json({
      success: true,
      message: 'Welcome to admin dashboard.',
      data: {
        admin: {
          id: admin._id,
          email: admin.email,
          firstName: admin.firstName,
          lastName: admin.lastName,
          fullName: admin.fullName,
          role: admin.role,
          permissions: admin.permissions,
          lastLogin: admin.lastLogin,
          createdAt: admin.createdAt
        },
        stats: {
          totalUsers: 0, // Placeholder - connect to database later
          totalOrders: orderStats.totalOrders,
          totalRevenue: orderStats.totalRevenue,
          totalMessages: 0, // Placeholder
          pendingOrders: orderStats.pendingOrders,
          preparingOrders: orderStats.preparingOrders,
          lastLogin: admin.lastLogin,
          accountCreated: admin.createdAt
        },
        recentActivity: recentOrders.map(order => ({
          description: `New order #${order.orderNumber} from ${order.customerInfo.name}`,
          time: order.createdAt.toLocaleString(),
          type: 'order'
        }))
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Error loading dashboard.'
    });
  }
});

// GET /api/admin/menu - Get menu items for admin management
router.get('/menu', verifyToken, verifyAdmin, (req, res) => {
  try {
    // Placeholder - in production, fetch from database
    res.status(200).json({
      success: true,
      message: 'Menu items retrieved successfully.',
      data: {
        menuItems: [], // Connect to database later
        totalItems: 0
      }
    });
  } catch (error) {
    console.error('Menu fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching menu items.'
    });
  }
});

// GET /api/admin/orders - Get all orders for admin management
router.get('/orders', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    
    const query = {};
    if (status) {
      query.status = status;
    }

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const totalOrders = await Order.countDocuments(query);

    res.status(200).json({
      success: true,
      message: 'Orders retrieved successfully.',
      data: {
        orders,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalOrders / limit),
          totalOrders,
          hasNext: page * limit < totalOrders,
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Orders fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching orders.'
    });
  }
});

// PUT /api/admin/orders/:id/status - Update order status
router.put('/orders/:id/status', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'preparing', 'ready', 'completed', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Valid statuses: ' + validStatuses.join(', ')
      });
    }

    const order = await Order.findById(id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found.'
      });
    }

    await order.updateStatus(status);

    res.status(200).json({
      success: true,
      message: `Order status updated to ${status}.`,
      data: {
        orderNumber: order.orderNumber,
        status: order.status,
        updatedAt: order.updatedAt
      }
    });
  } catch (error) {
    console.error('Order status update error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating order status.'
    });
  }
});

// GET /api/admin/orders/:id - Get specific order details
router.get('/orders/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order details retrieved.',
      data: order
    });
  } catch (error) {
    console.error('Order details error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching order details.'
    });
  }
});

module.exports = router;