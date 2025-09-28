const { OAuth2Client } = require('google-auth-library');

class GoogleAuthService {
  constructor() {
    this.client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_CALLBACK_URL
    );
  }

  /**
   * Verify Google ID token and get user information
   * @param {string} token - Google ID token from frontend
   * @returns {Promise<Object>} User information from Google
   */
  async verifyIdToken(token) {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      
      if (!payload) {
        throw new Error('Invalid Google token payload');
      }

      return {
        googleId: payload.sub,
        email: payload.email,
        firstName: payload.given_name,
        lastName: payload.family_name,
        fullName: payload.name,
        avatar: payload.picture,
        isEmailVerified: payload.email_verified || false,
      };
    } catch (error) {
      throw new Error(`Google token verification failed: ${error.message}`);
    }
  }

  /**
   * Generate authorization URL for OAuth flow
   * @param {string} state - State parameter for CSRF protection
   * @returns {string} Authorization URL
   */
  generateAuthUrl(state = '') {
    const authUrl = this.client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ],
      state,
      prompt: 'select_account'
    });

    return authUrl;
  }

  /**
   * Exchange authorization code for tokens
   * @param {string} code - Authorization code from Google
   * @returns {Promise<Object>} Token information
   */
  async getTokensFromCode(code) {
    try {
      const { tokens } = await this.client.getToken(code);
      return tokens;
    } catch (error) {
      throw new Error(`Failed to exchange code for tokens: ${error.message}`);
    }
  }

  /**
   * Get user info using access token
   * @param {string} accessToken - Google access token
   * @returns {Promise<Object>} User information
   */
  async getUserInfo(accessToken) {
    try {
      this.client.setCredentials({ access_token: accessToken });
      
      const userInfoResponse = await this.client.request({
        url: 'https://www.googleapis.com/oauth2/v2/userinfo'
      });

      const userInfo = userInfoResponse.data;

      return {
        googleId: userInfo.id,
        email: userInfo.email,
        firstName: userInfo.given_name,
        lastName: userInfo.family_name,
        fullName: userInfo.name,
        avatar: userInfo.picture,
        isEmailVerified: userInfo.verified_email || false,
      };
    } catch (error) {
      throw new Error(`Failed to get user info: ${error.message}`);
    }
  }
}

module.exports = new GoogleAuthService();