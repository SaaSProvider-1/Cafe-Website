const express = require('express');
const { body } = require('express-validator');
const validationMiddleware = require('../middleware/validation');
const { sendResponse } = require('../utils/responseHandler');
const emailService = require('../utils/emailService');

const router = express.Router();

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter/subscribe
// @access  Public
router.post('/subscribe', [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
], validationMiddleware, async (req, res, next) => {
  try {
    const { email } = req.body;
    
    // TODO: Save subscriber to database (optional)
    // For now, we'll just send a welcome email
    
    try {
      // Send welcome email to subscriber
      await emailService.sendNewsletterWelcomeEmail(email);
      
      sendResponse(res, 200, 'success', 'Successfully subscribed to newsletter', {
        message: 'Welcome to Café Elite! Check your email for a confirmation message.',
        email: email,
        subscribedAt: new Date()
      });
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      
      // Still return success even if email fails, but note the issue
      sendResponse(res, 200, 'success', 'Subscribed to newsletter', {
        message: 'You have been subscribed to our newsletter!',
        email: email,
        subscribedAt: new Date(),
        note: 'Confirmation email will be sent shortly'
      });
    }
    
  } catch (error) {
    next(error);
  }
});

// @desc    Unsubscribe from newsletter
// @route   POST /api/newsletter/unsubscribe
// @access  Public
router.post('/unsubscribe', [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
], validationMiddleware, async (req, res, next) => {
  try {
    const { email } = req.body;
    
    // TODO: Remove subscriber from database
    
    sendResponse(res, 200, 'success', 'Successfully unsubscribed from newsletter', {
      message: 'You have been unsubscribed from our newsletter.',
      email: email,
      unsubscribedAt: new Date()
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get newsletter subscribers (Admin only)
// @route   GET /api/newsletter/subscribers
// @access  Private/Admin
router.get('/subscribers', async (req, res, next) => {
  try {
    // TODO: Add admin authentication and implement subscriber retrieval
    sendResponse(res, 200, 'success', 'Newsletter subscribers endpoint', {
      subscribers: [],
      message: 'Subscriber management coming soon'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;