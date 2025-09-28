const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const logger = require('../utils/logger');
const { sendResponse } = require('../utils/responseHandler');
const { generateTokens, verifyRefreshToken } = require('../utils/jwt');
const googleAuthService = require('../utils/googleAuth');

class AuthController {
  // @desc    Register new user
  // @route   POST /api/auth/register
  // @access  Public
  async register(req, res, next) {
    try {
      const { firstName, lastName, email, password, phone } = req.body;

      // Check if user already exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return sendResponse(res, 400, 'fail', 'User with this email already exists');
      }

      // Create new user
      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        phone,
      });

      // Generate tokens
      const { accessToken, refreshToken } = generateTokens(user._id);

      // Add refresh token to user
      await user.addRefreshToken(refreshToken);

      // Set refresh token as httpOnly cookie
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      // Remove password from user object
      const userResponse = user.toObject();
      delete userResponse.password;
      delete userResponse.refreshTokens;

      logger.info(`New user registered: ${email}`);

      sendResponse(res, 201, 'success', 'User registered successfully', {
        user: userResponse,
        token: accessToken,
      });
    } catch (error) {
      logger.error('Register error:', error);
      next(error);
    }
  }

  // @desc    Login user
  // @route   POST /api/auth/login
  // @access  Public
  async login(req, res, next) {
    try {
      const { email, password, rememberMe } = req.body;

      // Find user and include password field
      const user = await User.findByEmail(email).select('+password');
      
      if (!user || !(await user.comparePassword(password))) {
        return sendResponse(res, 401, 'fail', 'Invalid email or password');
      }

      if (!user.isActive) {
        return sendResponse(res, 401, 'fail', 'Your account has been deactivated');
      }

      // Update last login
      user.lastLogin = new Date();
      await user.save({ validateBeforeSave: false });

      // Generate tokens
      const tokenExpiry = rememberMe ? '30d' : '7d';
      const { accessToken, refreshToken } = generateTokens(user._id, tokenExpiry);

      // Add refresh token to user
      await user.addRefreshToken(refreshToken);

      // Set refresh token as httpOnly cookie
      const cookieMaxAge = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000;
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: cookieMaxAge,
      });

      // Remove sensitive data from user object
      const userResponse = user.toObject();
      delete userResponse.password;
      delete userResponse.refreshTokens;
      delete userResponse.passwordResetToken;
      delete userResponse.emailVerificationToken;

      logger.info(`User logged in: ${email}`);

      sendResponse(res, 200, 'success', 'Login successful', {
        user: userResponse,
        token: accessToken,
      });
    } catch (error) {
      logger.error('Login error:', error);
      next(error);
    }
  }

  // @desc    Logout user
  // @route   POST /api/auth/logout
  // @access  Private
  async logout(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (refreshToken) {
        // Remove refresh token from user
        await req.user.removeRefreshToken(refreshToken);
      }

      // Clear refresh token cookie
      res.clearCookie('refreshToken');

      logger.info(`User logged out: ${req.user.email}`);

      sendResponse(res, 200, 'success', 'Logout successful');
    } catch (error) {
      logger.error('Logout error:', error);
      next(error);
    }
  }

  // @desc    Refresh token
  // @route   POST /api/auth/refresh
  // @access  Public
  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      if (!refreshToken) {
        return sendResponse(res, 401, 'fail', 'Refresh token not provided');
      }

      // Verify refresh token
      const decoded = verifyRefreshToken(refreshToken);
      
      // Find user and check if refresh token exists
      const user = await User.findById(decoded.id);
      if (!user || !user.refreshTokens.some(token => token.token === refreshToken)) {
        return sendResponse(res, 401, 'fail', 'Invalid refresh token');
      }

      // Generate new tokens
      const { accessToken, refreshToken: newRefreshToken } = generateTokens(user._id);

      // Replace old refresh token with new one
      await user.removeRefreshToken(refreshToken);
      await user.addRefreshToken(newRefreshToken);

      // Set new refresh token as httpOnly cookie
      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      // Remove sensitive data from user object
      const userResponse = user.toObject();
      delete userResponse.password;
      delete userResponse.refreshTokens;

      sendResponse(res, 200, 'success', 'Token refreshed successfully', {
        user: userResponse,
        token: accessToken,
      });
    } catch (error) {
      logger.error('Refresh token error:', error);
      sendResponse(res, 401, 'fail', 'Invalid refresh token');
    }
  }

  // @desc    Get current user
  // @route   GET /api/auth/me
  // @access  Private
  async getMe(req, res, next) {
    try {
      const user = await User.findById(req.user.id)
        .populate('preferences.favoriteItems')
        .populate('orders')
        .populate('reviews');

      sendResponse(res, 200, 'success', 'User profile retrieved successfully', {
        user,
      });
    } catch (error) {
      logger.error('Get profile error:', error);
      next(error);
    }
  }

  // @desc    Update user profile
  // @route   PUT /api/auth/me
  // @access  Private
  async updateProfile(req, res, next) {
    try {
      const allowedFields = ['firstName', 'lastName', 'phone', 'dateOfBirth', 'address', 'preferences'];
      const updateData = {};

      // Filter allowed fields
      Object.keys(req.body).forEach(key => {
        if (allowedFields.includes(key)) {
          updateData[key] = req.body[key];
        }
      });

      const user = await User.findByIdAndUpdate(
        req.user.id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

      logger.info(`User profile updated: ${user.email}`);

      sendResponse(res, 200, 'success', 'Profile updated successfully', {
        user,
      });
    } catch (error) {
      logger.error('Update profile error:', error);
      next(error);
    }
  }

  // @desc    Change password
  // @route   PUT /api/auth/change-password
  // @access  Private
  async changePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body;

      // Get user with password
      const user = await User.findById(req.user.id).select('+password');

      // Check current password
      if (!(await user.comparePassword(currentPassword))) {
        return sendResponse(res, 400, 'fail', 'Current password is incorrect');
      }

      // Update password
      user.password = newPassword;
      await user.save();

      logger.info(`Password changed for user: ${user.email}`);

      sendResponse(res, 200, 'success', 'Password changed successfully');
    } catch (error) {
      logger.error('Change password error:', error);
      next(error);
    }
  }

  // @desc    Forgot password
  // @route   POST /api/auth/forgot-password
  // @access  Public
  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;

      const user = await User.findByEmail(email);
      if (!user) {
        return sendResponse(res, 404, 'fail', 'No user found with that email address');
      }

      // Generate reset token
      const resetToken = user.createPasswordResetToken();
      await user.save({ validateBeforeSave: false });

      // TODO: Send email with reset token
      // For now, we'll just log it
      logger.info(`Password reset token for ${email}: ${resetToken}`);

      sendResponse(res, 200, 'success', 'Password reset token sent to email');
    } catch (error) {
      logger.error('Forgot password error:', error);
      next(error);
    }
  }

  // @desc    Reset password
  // @route   PUT /api/auth/reset-password
  // @access  Public
  async resetPassword(req, res, next) {
    try {
      const { token, password } = req.body;

      // Get user based on the token
      const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

      const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
      });

      if (!user) {
        return sendResponse(res, 400, 'fail', 'Token is invalid or has expired');
      }

      // Set new password
      user.password = password;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();

      logger.info(`Password reset successful for user: ${user.email}`);

      sendResponse(res, 200, 'success', 'Password reset successful');
    } catch (error) {
      logger.error('Reset password error:', error);
      next(error);
    }
  }

  // @desc    Verify email
  // @route   GET /api/auth/verify-email/:token
  // @access  Public
  async verifyEmail(req, res, next) {
    try {
      const { token } = req.params;

      const user = await User.findOne({
        emailVerificationToken: token,
      });

      if (!user) {
        return sendResponse(res, 400, 'fail', 'Invalid verification token');
      }

      user.isEmailVerified = true;
      user.emailVerificationToken = undefined;
      await user.save();

      logger.info(`Email verified for user: ${user.email}`);

      sendResponse(res, 200, 'success', 'Email verified successfully');
    } catch (error) {
      logger.error('Verify email error:', error);
      next(error);
    }
  }

  // @desc    Resend email verification
  // @route   POST /api/auth/resend-verification
  // @access  Private
  async resendVerification(req, res, next) {
    try {
      const user = req.user;

      if (user.isEmailVerified) {
        return sendResponse(res, 400, 'fail', 'Email is already verified');
      }

      // Generate new verification token
      const verificationToken = crypto.randomBytes(32).toString('hex');
      user.emailVerificationToken = verificationToken;
      await user.save();

      // TODO: Send verification email
      logger.info(`Verification email resent to: ${user.email}`);

      sendResponse(res, 200, 'success', 'Verification email sent');
    } catch (error) {
      logger.error('Resend verification error:', error);
      next(error);
    }
  }

  // @desc    Google Sign-In with credential
  // @route   POST /api/auth/google
  // @access  Public
  async googleSignIn(req, res, next) {
    try {
      const { credential, clientId } = req.body;

      if (!credential) {
        return sendResponse(res, 400, 'fail', 'Google credential is required');
      }

      // Verify Google ID token and get user info
      const googleUserInfo = await googleAuthService.verifyIdToken(credential);

      let user = await User.findByEmail(googleUserInfo.email);

      if (!user) {
        // Create new user from Google login
        user = await User.create({
          firstName: googleUserInfo.firstName,
          lastName: googleUserInfo.lastName,
          email: googleUserInfo.email,
          password: crypto.randomBytes(16).toString('hex'), // Random password
          avatar: googleUserInfo.avatar,
          isEmailVerified: googleUserInfo.isEmailVerified,
          // Add Google-specific fields
          googleId: googleUserInfo.googleId,
        });

        logger.info(`New user created via Google Sign-In: ${googleUserInfo.email}`);
      } else {
        // Update existing user with Google info if not set
        let updated = false;
        
        if (!user.googleId && googleUserInfo.googleId) {
          user.googleId = googleUserInfo.googleId;
          updated = true;
        }
        
        if (!user.avatar && googleUserInfo.avatar) {
          user.avatar = googleUserInfo.avatar;
          updated = true;
        }
        
        if (!user.isEmailVerified && googleUserInfo.isEmailVerified) {
          user.isEmailVerified = googleUserInfo.isEmailVerified;
          updated = true;
        }

        // Update last login
        user.lastLogin = new Date();
        updated = true;

        if (updated) {
          await user.save({ validateBeforeSave: false });
        }

        logger.info(`User logged in via Google Sign-In: ${googleUserInfo.email}`);
      }

      if (!user.isActive) {
        return sendResponse(res, 401, 'fail', 'Your account has been deactivated');
      }

      // Generate tokens
      const { accessToken, refreshToken } = generateTokens(user._id);

      // Add refresh token to user
      await user.addRefreshToken(refreshToken);

      // Set refresh token as httpOnly cookie
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      // Remove sensitive data from user object
      const userResponse = user.toObject();
      delete userResponse.password;
      delete userResponse.refreshTokens;
      delete userResponse.passwordResetToken;
      delete userResponse.emailVerificationToken;

      sendResponse(res, 200, 'success', 'Google Sign-In successful', {
        user: userResponse,
        token: accessToken,
      });
    } catch (error) {
      logger.error('Google Sign-In error:', error);
      if (error.message.includes('Google token verification failed')) {
        return sendResponse(res, 400, 'fail', 'Invalid Google credential');
      }
      next(error);
    }
  }

  // @desc    Google login with ID token
  // @route   POST /api/auth/google-login
  // @access  Public
  async googleLogin(req, res, next) {
    try {
      const { idToken } = req.body;

      if (!idToken) {
        return sendResponse(res, 400, 'fail', 'Google ID token is required');
      }

      // Verify Google ID token and get user info
      const googleUserInfo = await googleAuthService.verifyIdToken(idToken);

      let user = await User.findByEmail(googleUserInfo.email);

      if (!user) {
        // Create new user from Google login
        user = await User.create({
          firstName: googleUserInfo.firstName,
          lastName: googleUserInfo.lastName,
          email: googleUserInfo.email,
          password: crypto.randomBytes(16).toString('hex'), // Random password
          avatar: googleUserInfo.avatar,
          isEmailVerified: googleUserInfo.isEmailVerified,
          // Add Google-specific fields
          googleId: googleUserInfo.googleId,
        });

        logger.info(`New user created via Google: ${googleUserInfo.email}`);
      } else {
        // Update existing user with Google info if not set
        let updated = false;
        
        if (!user.googleId && googleUserInfo.googleId) {
          user.googleId = googleUserInfo.googleId;
          updated = true;
        }
        
        if (!user.avatar && googleUserInfo.avatar) {
          user.avatar = googleUserInfo.avatar;
          updated = true;
        }
        
        if (!user.isEmailVerified && googleUserInfo.isEmailVerified) {
          user.isEmailVerified = googleUserInfo.isEmailVerified;
          updated = true;
        }

        // Update last login
        user.lastLogin = new Date();
        updated = true;

        if (updated) {
          await user.save({ validateBeforeSave: false });
        }

        logger.info(`User logged in via Google: ${googleUserInfo.email}`);
      }

      if (!user.isActive) {
        return sendResponse(res, 401, 'fail', 'Your account has been deactivated');
      }

      // Generate tokens
      const { accessToken, refreshToken } = generateTokens(user._id);

      // Add refresh token to user
      await user.addRefreshToken(refreshToken);

      // Set refresh token as httpOnly cookie
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      // Remove sensitive data from user object
      const userResponse = user.toObject();
      delete userResponse.password;
      delete userResponse.refreshTokens;
      delete userResponse.passwordResetToken;
      delete userResponse.emailVerificationToken;

      sendResponse(res, 200, 'success', 'Google login successful', {
        user: userResponse,
        token: accessToken,
      });
    } catch (error) {
      logger.error('Google login error:', error);
      if (error.message.includes('Google token verification failed')) {
        return sendResponse(res, 400, 'fail', 'Invalid Google token');
      }
      next(error);
    }
  }

  // @desc    Get Google OAuth URL
  // @route   GET /api/auth/google-url
  // @access  Public
  async getGoogleAuthUrl(req, res, next) {
    try {
      const state = crypto.randomBytes(32).toString('hex');
      const authUrl = googleAuthService.generateAuthUrl(state);

      // Store state in session or database for verification
      // For now, we'll just return the URL
      sendResponse(res, 200, 'success', 'Google auth URL generated', {
        authUrl,
        state
      });
    } catch (error) {
      logger.error('Google auth URL error:', error);
      next(error);
    }
  }

  // @desc    Handle Google OAuth callback
  // @route   GET /api/auth/google/callback
  // @access  Public
  async googleCallback(req, res, next) {
    try {
      const { code, state } = req.query;

      if (!code) {
        return sendResponse(res, 400, 'fail', 'Authorization code is required');
      }

      // Exchange code for tokens
      const tokens = await googleAuthService.getTokensFromCode(code);
      
      // Get user info using access token
      const googleUserInfo = await googleAuthService.getUserInfo(tokens.access_token);

      let user = await User.findByEmail(googleUserInfo.email);

      if (!user) {
        // Create new user
        user = await User.create({
          firstName: googleUserInfo.firstName,
          lastName: googleUserInfo.lastName,
          email: googleUserInfo.email,
          password: crypto.randomBytes(16).toString('hex'),
          avatar: googleUserInfo.avatar,
          isEmailVerified: googleUserInfo.isEmailVerified,
          googleId: googleUserInfo.googleId,
        });

        logger.info(`New user created via Google OAuth: ${googleUserInfo.email}`);
      } else {
        // Update last login and any missing info
        user.lastLogin = new Date();
        
        if (!user.googleId) user.googleId = googleUserInfo.googleId;
        if (!user.avatar) user.avatar = googleUserInfo.avatar;
        if (!user.isEmailVerified) user.isEmailVerified = googleUserInfo.isEmailVerified;

        await user.save({ validateBeforeSave: false });
        logger.info(`User logged in via Google OAuth: ${googleUserInfo.email}`);
      }

      // Generate tokens
      const { accessToken, refreshToken } = generateTokens(user._id);
      await user.addRefreshToken(refreshToken);

      // Set refresh token cookie
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      // Redirect to frontend with token
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      res.redirect(`${frontendUrl}/?auth=success&token=${accessToken}`);
    } catch (error) {
      logger.error('Google OAuth callback error:', error);
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      res.redirect(`${frontendUrl}/?auth=error&message=${encodeURIComponent(error.message)}`);
    }
  }

  // @desc    Social login (Legacy - kept for compatibility)
  // @route   POST /api/auth/social-login
  // @access  Public
  async socialLogin(req, res, next) {
    try {
      const { provider, token, userData } = req.body;

      // For Google, redirect to use the new google-login endpoint
      if (provider === 'google') {
        return sendResponse(res, 400, 'fail', 'Please use /api/auth/google-login endpoint for Google authentication');
      }

      // TODO: Implement Facebook and Apple login
      const { email, firstName, lastName, avatar } = userData;

      let user = await User.findByEmail(email);

      if (!user) {
        // Create new user from social login
        user = await User.create({
          firstName,
          lastName,
          email,
          password: crypto.randomBytes(16).toString('hex'), // Random password
          avatar,
          isEmailVerified: true, // Social logins are pre-verified
        });

        logger.info(`New user created via ${provider}: ${email}`);
      } else {
        // Update last login
        user.lastLogin = new Date();
        await user.save({ validateBeforeSave: false });
      }

      // Generate tokens
      const { accessToken, refreshToken } = generateTokens(user._id);

      // Add refresh token to user
      await user.addRefreshToken(refreshToken);

      // Set refresh token as httpOnly cookie
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      // Remove sensitive data from user object
      const userResponse = user.toObject();
      delete userResponse.password;
      delete userResponse.refreshTokens;

      logger.info(`User logged in via ${provider}: ${email}`);

      sendResponse(res, 200, 'success', 'Social login successful', {
        user: userResponse,
        token: accessToken,
      });
    } catch (error) {
      logger.error('Social login error:', error);
      next(error);
    }
  }
}

module.exports = new AuthController();