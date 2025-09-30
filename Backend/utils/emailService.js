const nodemailer = require('nodemailer');

/**
 * Email Service for sending admin notifications
 */
class EmailService {
  constructor() {
    this.transporter = this.createTransporter();
  }

  /**
   * Create nodemailer transporter with SMTP configuration
   */
  createTransporter() {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  /**
   * Verify SMTP connection
   */
  async verifyConnection() {
    try {
      await this.transporter.verify();
      console.log('✅ SMTP connection verified successfully');
      return true;
    } catch (error) {
      console.error('❌ SMTP connection failed:', error.message);
      return false;
    }
  }

  /**
   * Send license key email to admin
   */
  async sendLicenseKeyEmail(adminEmail, licenseKey, cliCommand) {
    const emailContent = this.generateLicenseKeyEmailTemplate(licenseKey, cliCommand);
    
    const mailOptions = {
      from: {
        name: 'Café Elite Admin System',
        address: process.env.SMTP_EMAIL
      },
      to: adminEmail,
      subject: '🔑 Your Café Elite Admin License Key',
      html: emailContent.html,
      text: emailContent.text
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('✅ License key email sent successfully:', info.messageId);
      return {
        success: true,
        messageId: info.messageId,
        accepted: info.accepted,
        rejected: info.rejected
      };
    } catch (error) {
      console.error('❌ Failed to send license key email:', error);
      throw new Error(`Email sending failed: ${error.message}`);
    }
  }

  /**
   * Send admin account created notification
   */
  async sendAdminCreatedEmail(adminEmail, adminName, loginUrl) {
    const emailContent = this.generateAdminCreatedEmailTemplate(adminName, loginUrl, adminEmail);
    
    const mailOptions = {
      from: {
        name: 'Café Elite Admin System',
        address: process.env.SMTP_EMAIL
      },
      to: adminEmail,
      subject: '✅ Admin Account Created Successfully',
      html: emailContent.html,
      text: emailContent.text
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('✅ Admin created email sent successfully:', info.messageId);
      return {
        success: true,
        messageId: info.messageId
      };
    } catch (error) {
      console.error('❌ Failed to send admin created email:', error);
      throw new Error(`Email sending failed: ${error.message}`);
    }
  }

  /**
   * Generate license key email template
   */
  generateLicenseKeyEmailTemplate(licenseKey, cliCommand) {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Café Elite Admin License Key</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #8B4513, #D2691E); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .license-box { background: white; border: 2px solid #8B4513; padding: 20px; margin: 20px 0; border-radius: 8px; text-align: center; }
        .license-key { font-size: 24px; font-weight: bold; color: #8B4513; letter-spacing: 2px; margin: 10px 0; }
        .cli-command { background: #2d3748; color: #e2e8f0; padding: 15px; border-radius: 5px; font-family: monospace; font-size: 14px; margin: 15px 0; overflow-x: auto; }
        .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .steps { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .step { margin: 15px 0; padding: 10px 0; border-bottom: 1px solid #eee; }
        .step:last-child { border-bottom: none; }
        .step-number { background: #8B4513; color: white; border-radius: 50%; width: 25px; height: 25px; display: inline-flex; align-items: center; justify-content: center; margin-right: 10px; font-weight: bold; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>☕ Café Elite Admin System</h1>
        <p>Your Admin License Key is Ready!</p>
      </div>
      
      <div class="content">
        <h2>Welcome to Café Elite Admin System!</h2>
        <p>Congratulations! Your admin license key has been generated successfully. This key will allow you to create your admin account and access the Café Elite management system.</p>
        
        <div class="license-box">
          <h3>🔑 Your License Key</h3>
          <div class="license-key">${licenseKey}</div>
          <p><small>Keep this key secure and do not share it with others</small></p>
        </div>
        
        <div class="warning">
          <strong>⚠️ Important:</strong> This license key can only be used once to create an admin account. Make sure to store it securely until you complete the setup process.
        </div>
        
        <div class="steps">
          <h3>📋 Setup Instructions</h3>
          
          <div class="step">
            <span class="step-number">1</span>
            <strong>Open Terminal/Command Prompt</strong><br>
            Navigate to your Café Elite backend directory
          </div>
          
          <div class="step">
            <span class="step-number">2</span>
            <strong>Run the CLI Command</strong><br>
            Execute the following command with your license key:
            <div class="cli-command">${cliCommand}</div>
          </div>
          
          <div class="step">
            <span class="step-number">3</span>
            <strong>Follow the Prompts</strong><br>
            Enter your admin details (name, email, password) when prompted
          </div>
          
          <div class="step">
            <span class="step-number">4</span>
            <strong>Access Admin Panel</strong><br>
            Once setup is complete, you can login to the admin panel at:<br>
            <strong>${process.env.FRONTEND_URL}/admin</strong>
          </div>
        </div>
        
        <div class="warning">
          <strong>🛡️ Security Note:</strong> After creating your admin account, this license key will be deactivated automatically for security purposes.
        </div>
      </div>
      
      <div class="footer">
        <p>This is an automated message from Café Elite Admin System.</p>
        <p>If you didn't request this license key, please contact support immediately.</p>
      </div>
    </body>
    </html>
    `;

    const text = `
    🔑 CAFÉ ELITE ADMIN LICENSE KEY
    
    Your license key: ${licenseKey}
    
    Setup Instructions:
    1. Open terminal/command prompt
    2. Navigate to your Café Elite backend directory
    3. Run: ${cliCommand}
    4. Follow the prompts to create your admin account
    5. Access admin panel at: ${process.env.FRONTEND_URL}/admin
    
    ⚠️ IMPORTANT: 
    - This license key can only be used once
    - Keep it secure until setup is complete
    - The key will be deactivated after use
    
    If you didn't request this license key, please contact support.
    `;

    return { html, text };
  }

  /**
   * Generate admin created email template
   */
  generateAdminCreatedEmailTemplate(adminName, loginUrl, email) {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Admin Account Created</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #28a745, #20c997); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .success-box { background: #d4edda; border: 1px solid #c3e6cb; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
        .login-button { background: #8B4513; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
        .credentials { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #8B4513; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>✅ Account Created Successfully!</h1>
        <p>Welcome to Café Elite Admin System</p>
      </div>
      
      <div class="content">
        <div class="success-box">
          <h2>🎉 Welcome, ${adminName}!</h2>
          <p>Your admin account has been created successfully and is ready to use.</p>
        </div>
        
        <div class="credentials">
          <h3>📋 Your Account Details</h3>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Role:</strong> Administrator</p>
          <p><strong>Status:</strong> Active</p>
        </div>
        
        <div style="text-align: center;">
          <a href="${loginUrl}" class="login-button">🚀 Access Admin Panel</a>
        </div>
        
        <h3>🔧 What you can do now:</h3>
        <ul>
          <li>📊 View dashboard analytics</li>
          <li>☕ Manage menu items</li>
          <li>👥 Handle customer orders</li>
          <li>📈 Monitor sales reports</li>
          <li>⚙️ Configure system settings</li>
        </ul>
        
        <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <strong>🔒 Security Reminder:</strong> Keep your login credentials secure and change your password regularly.
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 30px; color: #666; font-size: 14px;">
        <p>Thank you for choosing Café Elite Admin System!</p>
      </div>
    </body>
    </html>
    `;

    const text = `
    ✅ ADMIN ACCOUNT CREATED SUCCESSFULLY
    
    Welcome, ${adminName}!
    
    Your Account Details:
    - Email: ${email}
    - Role: Administrator
    - Status: Active
    
    Access your admin panel: ${loginUrl}
    
    Features available:
    - Dashboard analytics
    - Menu management
    - Order handling
    - Sales reports
    - System settings
    
    🔒 Security Reminder: Keep your credentials secure and change your password regularly.
    
    Thank you for choosing Café Elite Admin System!
    `;

    return { html, text };
  }
}

module.exports = new EmailService();