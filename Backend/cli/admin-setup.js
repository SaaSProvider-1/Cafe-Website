#!/usr/bin/env node

/**
 * Café Elite Admin Setup CLI Tool
 * Used to create admin accounts with license keys
 */

const mongoose = require('mongoose');
const readline = require('readline');
const colors = require('colors');
require('dotenv').config();

// Import models and utilities
const Admin = require('../models/Admin');
const LicenseKeyGenerator = require('../utils/licenseGenerator');
const emailService = require('../utils/emailService');

// Configure colors
colors.setTheme({
  info: 'cyan',
  success: 'green',
  warning: 'yellow',
  error: 'red',
  highlight: 'magenta'
});

class AdminSetupCLI {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  /**
   * Main entry point
   */
  async run() {
    try {
      console.log('\n' + '='.repeat(60).info);
      console.log('🚀 CAFÉ ELITE ADMIN SETUP TOOL'.highlight.bold);
      console.log('='.repeat(60).info + '\n');

      // Parse command line arguments
      const args = this.parseArgs();
      
      // Connect to database
      await this.connectToDatabase();
      
      if (args.license) {
        // Setup with license key
        await this.setupWithLicense(args.license);
      } else {
        // Interactive setup
        await this.interactiveSetup();
      }

    } catch (error) {
      console.error('\n❌ Error:'.error, error.message);
      process.exit(1);
    } finally {
      this.rl.close();
      process.exit(0);
    }
  }

  /**
   * Parse command line arguments
   */
  parseArgs() {
    const args = process.argv.slice(2);
    const parsed = {};

    args.forEach(arg => {
      if (arg.startsWith('--license=')) {
        parsed.license = arg.split('=')[1];
      } else if (arg === '--help' || arg === '-h') {
        this.showHelp();
        process.exit(0);
      }
    });

    return parsed;
  }

  /**
   * Show help information
   */
  showHelp() {
    console.log('\n📖 CAFÉ ELITE ADMIN SETUP HELP'.info.bold);
    console.log('\nUsage:'.warning);
    console.log('  node cli/admin-setup.js [options]'.highlight);
    console.log('\nOptions:'.warning);
    console.log('  --license=<key>  Setup admin with license key'.info);
    console.log('  --help, -h       Show this help message'.info);
    console.log('\nExamples:'.warning);
    console.log('  node cli/admin-setup.js'.highlight);
    console.log('  node cli/admin-setup.js --license=CAFE-1234-5678-9ABC-DEF0'.highlight);
    console.log('');
  }

  /**
   * Connect to MongoDB
   */
  async connectToDatabase() {
    try {
      console.log('🔌 Connecting to database...'.info);
      
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      
      console.log('✅ Database connected successfully'.success);
    } catch (error) {
      throw new Error(`Database connection failed: ${error.message}`);
    }
  }

  /**
   * Setup admin with license key
   */
  async setupWithLicense(licenseKey) {
    console.log(`\n🔑 Setting up admin with license key: ${licenseKey.highlight}`);
    
    // Validate license key format
    const validation = LicenseKeyGenerator.validateLicenseKey(licenseKey);
    if (!validation.valid) {
      throw new Error(`Invalid license key: ${validation.error}`);
    }

    // Check if admin already exists
    const adminExists = await Admin.adminExists();
    if (adminExists) {
      throw new Error('Admin already exists in the system. Only one admin account is allowed.');
    }

    // Get admin details
    const adminData = await this.getAdminDetails();
    adminData.licenseKey = licenseKey;

    // Create admin account
    await this.createAdminAccount(adminData);
  }

  /**
   * Interactive setup
   */
  async interactiveSetup() {
    console.log('🎯 Starting interactive admin setup...'.info);
    
    // Check if admin already exists
    const adminExists = await Admin.adminExists();
    if (adminExists) {
      console.log('\n⚠️  Admin already exists!'.warning);
      console.log('Only one admin account is allowed in the system.'.warning);
      console.log('If you need to reset the admin, please contact support.'.info);
      return;
    }

    console.log('\n📧 A license key will be generated and sent to your email.'.info);
    
    const email = await this.promptInput('Enter your email address: ');
    
    if (!email || !this.isValidEmail(email)) {
      throw new Error('Please provide a valid email address');
    }

    // Generate and send license key
    await this.generateAndSendLicense(email);
    
    console.log('\n✅ License key sent successfully!'.success);
    console.log('📬 Check your email for the license key and setup instructions.'.info);
    console.log('\n🔄 After receiving the license key, run:'.warning);
    console.log(`   node cli/admin-setup.js --license=<YOUR_LICENSE_KEY>`.highlight);
  }

  /**
   * Get admin details from user input
   */
  async getAdminDetails() {
    console.log('\n👤 Please provide admin account details:'.info.bold);
    
    const firstName = await this.promptInput('First Name: ');
    const lastName = await this.promptInput('Last Name: ');
    const email = await this.promptInput('Email Address: ');
    const password = await this.promptPassword('Password: ');
    const confirmPassword = await this.promptPassword('Confirm Password: ');

    // Validate inputs
    if (!firstName || !lastName || !email || !password) {
      throw new Error('All fields are required');
    }

    if (!this.isValidEmail(email)) {
      throw new Error('Please provide a valid email address');
    }

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    return { firstName, lastName, email, password };
  }

  /**
   * Create admin account
   */
  async createAdminAccount(adminData) {
    try {
      console.log('\n🔨 Creating admin account...'.info);
      
      const admin = await Admin.createFirstAdmin(adminData);
      
      console.log('\n🎉 Admin account created successfully!'.success.bold);
      console.log('\n📋 Account Details:'.info);
      console.log(`   Name: ${admin.fullName}`.success);
      console.log(`   Email: ${admin.email}`.success);
      console.log(`   Role: ${admin.role}`.success);
      console.log(`   License Key: ${admin.licenseKey}`.success);
      console.log(`   Created: ${admin.createdAt}`.success);

      // Send welcome email
      try {
        const loginUrl = `${process.env.FRONTEND_URL}/admin`;
        await emailService.sendAdminCreatedEmail(admin.email, admin.fullName, loginUrl);
        console.log('\n📧 Welcome email sent successfully!'.success);
      } catch (emailError) {
        console.log('\n⚠️  Account created but failed to send welcome email.'.warning);
      }

      console.log('\n🚀 You can now login to the admin panel at:'.info);
      console.log(`   ${process.env.FRONTEND_URL}/admin`.highlight.bold);

    } catch (error) {
      throw new Error(`Failed to create admin account: ${error.message}`);
    }
  }

  /**
   * Generate and send license key
   */
  async generateAndSendLicense(email) {
    try {
      const licenseData = LicenseKeyGenerator.createLicenseKeyWithMetadata('standard');
      await emailService.sendLicenseKeyEmail(email, licenseData.licenseKey, licenseData.cliCommand);
      
      console.log(`\n📧 License key sent to: ${email.highlight}`);
      console.log(`🔑 License Key: ${licenseData.licenseKey.highlight}`);
      
    } catch (error) {
      throw new Error(`Failed to send license key: ${error.message}`);
    }
  }

  /**
   * Prompt for user input
   */
  promptInput(question) {
    return new Promise((resolve) => {
      this.rl.question(question.info, (answer) => {
        resolve(answer.trim());
      });
    });
  }

  /**
   * Prompt for password (hidden input)
   */
  promptPassword(question) {
    return new Promise((resolve) => {
      const stdin = process.stdin;
      let password = '';

      stdin.setRawMode(true);
      stdin.resume();
      stdin.setEncoding('utf8');

      process.stdout.write(question.info);

      stdin.on('data', function(key) {
        if (key === '\u0003') {
          // Ctrl+C
          process.exit();
        } else if (key === '\r' || key === '\n') {
          // Enter key
          stdin.setRawMode(false);
          stdin.pause();
          stdin.removeAllListeners('data');
          process.stdout.write('\n');
          resolve(password);
        } else if (key === '\u007f') {
          // Backspace
          if (password.length > 0) {
            password = password.slice(0, -1);
            process.stdout.write('\b \b');
          }
        } else {
          password += key;
          process.stdout.write('*');
        }
      });
    });
  }

  /**
   * Validate email format
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Install colors if not available
try {
  require('colors');
} catch (error) {
  console.log('Installing colors package...');
  require('child_process').execSync('npm install colors', { stdio: 'inherit' });
  console.log('Colors package installed. Please run the command again.');
  process.exit(0);
}

// Run the CLI tool
if (require.main === module) {
  const cli = new AdminSetupCLI();
  cli.run().catch(error => {
    console.error('\n❌ Fatal Error:'.red, error.message);
    process.exit(1);
  });
}

module.exports = AdminSetupCLI;