const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

/**
 * License Key Generator Utility
 * Generates secure license keys for admin registration
 */

class LicenseKeyGenerator {
  /**
   * Generate a secure license key
   * Format: CAFE-XXXX-XXXX-XXXX-XXXX
   */
  static generateLicenseKey() {
    // Generate 4 groups of 4 characters each
    const groups = [];
    
    for (let i = 0; i < 4; i++) {
      // Generate random bytes and convert to hex
      const randomBytes = crypto.randomBytes(2);
      const group = randomBytes.toString('hex').toUpperCase();
      groups.push(group);
    }
    
    return `CAFE-${groups.join('-')}`;
  }

  /**
   * Generate a UUID-based license key
   * Format: CAFE-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
   */
  static generateUUIDLicenseKey() {
    const uuid = uuidv4().replace(/-/g, '').toUpperCase();
    return `CAFE-${uuid.substring(0, 8)}-${uuid.substring(8, 12)}-${uuid.substring(12, 16)}-${uuid.substring(16, 20)}-${uuid.substring(20)}`;
  }

  /**
   * Generate a time-based license key
   * Format: CAFE-TIMESTAMP-RANDOM
   */
  static generateTimeLicenseKey() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = crypto.randomBytes(4).toString('hex').toUpperCase();
    return `CAFE-${timestamp}-${random}`;
  }

  /**
   * Generate admin activation code (for email verification)
   * Format: 6-digit numeric code
   */
  static generateActivationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Generate a secure temporary password
   */
  static generateTempPassword(length = 12) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    
    // Ensure at least one character from each required type
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*';
    
    password += upper[Math.floor(Math.random() * upper.length)];
    password += lower[Math.floor(Math.random() * lower.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];
    
    // Fill the rest randomly
    for (let i = 4; i < length; i++) {
      password += charset[Math.floor(Math.random() * charset.length)];
    }
    
    // Shuffle the password
    return password.split('').sort(() => Math.random() - 0.5).join('');
  }

  /**
   * Validate license key format
   */
  static validateLicenseKey(licenseKey) {
    if (!licenseKey || typeof licenseKey !== 'string') {
      return { valid: false, error: 'License key is required' };
    }

    // Check if it starts with CAFE-
    if (!licenseKey.startsWith('CAFE-')) {
      return { valid: false, error: 'Invalid license key format' };
    }

    // Remove CAFE- prefix and check format
    const keyPart = licenseKey.substring(5);
    
    // Check different valid formats
    const formats = [
      /^[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}$/, // Standard format
      /^[A-F0-9]{8}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{12}$/, // UUID format
      /^[A-Z0-9]+-[A-F0-9]{8}$/ // Time-based format
    ];

    const isValid = formats.some(format => format.test(keyPart));
    
    if (!isValid) {
      return { valid: false, error: 'Invalid license key format' };
    }

    return { valid: true };
  }

  /**
   * Generate CLI command for admin creation
   */
  static generateCLICommand(licenseKey) {
    return `node cli/admin-setup.js --license=${licenseKey}`;
  }

  /**
   * Create license key with metadata
   */
  static createLicenseKeyWithMetadata(type = 'standard') {
    let licenseKey;
    
    switch (type) {
      case 'uuid':
        licenseKey = this.generateUUIDLicenseKey();
        break;
      case 'time':
        licenseKey = this.generateTimeLicenseKey();
        break;
      default:
        licenseKey = this.generateLicenseKey();
    }

    return {
      licenseKey,
      type,
      generated: new Date().toISOString(),
      expires: null, // License keys don't expire unless specified
      used: false,
      cliCommand: this.generateCLICommand(licenseKey),
      validation: this.validateLicenseKey(licenseKey)
    };
  }
}

module.exports = LicenseKeyGenerator;