const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
const validationMiddleware = require('../middleware/validation');

const router = express.Router();

// Validation rules
const registerValidation = [
  body('firstName')
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2-50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First name can only contain letters and spaces'),
  
  body('lastName')
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2-50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Last name can only contain letters and spaces'),
  
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail()
    .toLowerCase(),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
];

const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail()
    .toLowerCase(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

const forgotPasswordValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail()
    .toLowerCase(),
];

const resetPasswordValidation = [
  body('token')
    .notEmpty()
    .withMessage('Reset token is required'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
];

const changePasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('New password must contain at least one uppercase letter, one lowercase letter, and one number'),
];

// Routes

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', registerValidation, validationMiddleware, authController.register);

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', loginValidation, validationMiddleware, authController.login);

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
router.post('/logout', authMiddleware, authController.logout);

// @desc    Refresh token
// @route   POST /api/auth/refresh
// @access  Public
router.post('/refresh', authController.refreshToken);

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
router.get('/me', authMiddleware, authController.getMe);

// @desc    Update user profile
// @route   PUT /api/auth/me
// @access  Private
router.put('/me', authMiddleware, [
  body('firstName')
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2-50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First name can only contain letters and spaces'),
  
  body('lastName')
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2-50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Last name can only contain letters and spaces'),
  
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
], validationMiddleware, authController.updateProfile);

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
router.put('/change-password', authMiddleware, changePasswordValidation, validationMiddleware, authController.changePassword);

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
router.post('/forgot-password', forgotPasswordValidation, validationMiddleware, authController.forgotPassword);

// @desc    Reset password
// @route   PUT /api/auth/reset-password
// @access  Public
router.put('/reset-password', resetPasswordValidation, validationMiddleware, authController.resetPassword);

// @desc    Verify email
// @route   GET /api/auth/verify-email/:token
// @access  Public
router.get('/verify-email/:token', authController.verifyEmail);

// @desc    Resend email verification
// @route   POST /api/auth/resend-verification
// @access  Private
router.post('/resend-verification', authMiddleware, authController.resendVerification);

// @desc    Google Sign-In with credential
// @route   POST /api/auth/google
// @access  Public
router.post('/google', [
  body('credential')
    .notEmpty()
    .withMessage('Google credential is required'),
], validationMiddleware, authController.googleSignIn);

// @desc    Google login with ID token
// @route   POST /api/auth/google-login
// @access  Public
router.post('/google-login', [
  body('idToken')
    .notEmpty()
    .withMessage('Google ID token is required'),
], validationMiddleware, authController.googleLogin);

// @desc    Get Google OAuth URL
// @route   GET /api/auth/google-url
// @access  Public
router.get('/google-url', authController.getGoogleAuthUrl);

// @desc    Handle Google OAuth callback
// @route   GET /api/auth/google/callback
// @access  Public
router.get('/google/callback', authController.googleCallback);

// @desc    Social login (Legacy - kept for compatibility)
// @route   POST /api/auth/social-login
// @access  Public
router.post('/social-login', [
  body('provider')
    .isIn(['google', 'facebook', 'apple'])
    .withMessage('Invalid social provider'),
  
  body('token')
    .notEmpty()
    .withMessage('Social token is required'),
], validationMiddleware, authController.socialLogin);

module.exports = router;