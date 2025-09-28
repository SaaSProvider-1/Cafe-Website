const express = require('express');
const { body } = require('express-validator');
const validationMiddleware = require('../middleware/validation');
const { sendResponse } = require('../utils/responseHandler');

const router = express.Router();

// @desc    Send contact message
// @route   POST /api/contact
// @access  Public
router.post('/', [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2-100 characters'),
  
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('subject')
    .notEmpty()
    .withMessage('Subject is required')
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5-200 characters'),
  
  body('message')
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10-1000 characters'),
], validationMiddleware, async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // TODO: Save contact message to database
    // TODO: Send email notification to admin
    
    sendResponse(res, 200, 'success', 'Contact message sent successfully', {
      message: 'Thank you for your message! We will get back to you soon.',
      contactData: {
        name,
        email,
        subject,
        receivedAt: new Date()
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get contact messages (Admin only)
// @route   GET /api/contact
// @access  Private/Admin
router.get('/', async (req, res, next) => {
  try {
    // TODO: Add admin authentication and implement message retrieval
    sendResponse(res, 200, 'success', 'Contact messages endpoint', {
      messages: [],
      message: 'Contact message management coming soon'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;