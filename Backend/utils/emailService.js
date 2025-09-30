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
   * Send newsletter welcome email
   */
  async sendNewsletterWelcomeEmail(subscriberEmail) {
    const emailContent = this.generateNewsletterWelcomeEmailTemplate(subscriberEmail);
    
    const mailOptions = {
      from: {
        name: 'Café Elite',
        address: process.env.SMTP_EMAIL
      },
      to: subscriberEmail,
      subject: '☕ Welcome to Café Elite Newsletter!',
      html: emailContent.html,
      text: emailContent.text
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('✅ Newsletter welcome email sent successfully:', info.messageId);
      return {
        success: true,
        messageId: info.messageId,
        accepted: info.accepted,
        rejected: info.rejected
      };
    } catch (error) {
      console.error('❌ Failed to send newsletter welcome email:', error);
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
   * Generate newsletter welcome email template
   */
  generateNewsletterWelcomeEmailTemplate(subscriberEmail) {
    const unsubscribeUrl = `${process.env.FRONTEND_URL}/unsubscribe?email=${encodeURIComponent(subscriberEmail)}`;
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Café Elite Newsletter</title>
      <style>
        body { font-family: 'Georgia', serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f7f4; }
        .container { background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #8B4513, #D2691E); color: white; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
        .header p { margin: 10px 0 0 0; font-size: 16px; opacity: 0.9; }
        .content { padding: 40px 30px; }
        .welcome-section { text-align: center; margin-bottom: 30px; }
        .welcome-section h2 { color: #8B4513; margin-bottom: 15px; font-size: 24px; }
        .perks { background: #fef7f0; border-left: 4px solid #D2691E; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0; }
        .perks h3 { color: #8B4513; margin-top: 0; }
        .perks ul { margin: 15px 0; padding-left: 20px; }
        .perks li { margin: 8px 0; color: #5d4037; }
        .cta-section { text-align: center; margin: 30px 0; }
        .cta-button { background: linear-gradient(135deg, #8B4513, #D2691E); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold; transition: transform 0.3s; }
        .social-section { text-align: center; margin: 30px 0; padding: 20px; background: #f8f4f0; border-radius: 10px; }
        .social-links { margin: 15px 0; }
        .social-links a { display: inline-block; margin: 0 10px; padding: 10px; background: #8B4513; color: white; border-radius: 50%; text-decoration: none; width: 40px; height: 40px; line-height: 20px; }
        .footer { background: #2c1810; color: #d7ccc8; padding: 30px; text-align: center; font-size: 14px; }
        .unsubscribe { margin-top: 20px; }
        .unsubscribe a { color: #ffab91; text-decoration: none; }
        .coffee-icon { font-size: 48px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="coffee-icon">☕</div>
          <h1>Welcome to Café Elite!</h1>
          <p>Your journey to extraordinary coffee begins now</p>
        </div>
        
        <div class="content">
          <div class="welcome-section">
            <h2>🎉 Thank you for subscribing!</h2>
            <p>We're thrilled to have you join our coffee-loving community. Get ready to discover amazing blends, brewing tips, and exclusive offers!</p>
          </div>
          
          <div class="perks">
            <h3>🌟 What you'll receive:</h3>
            <ul>
              <li>☕ <strong>New Blend Announcements</strong> - Be the first to try our latest coffee creations</li>
              <li>💰 <strong>Exclusive Discounts</strong> - Special offers just for subscribers</li>
              <li>📚 <strong>Brewing Tips & Guides</strong> - Master the art of coffee making</li>
              <li>🎪 <strong>Event Invitations</strong> - Coffee tastings, workshops, and special events</li>
              <li>☁️ <strong>Seasonal Specials</strong> - Limited-time flavors and holiday blends</li>
            </ul>
          </div>
          
          <div class="cta-section">
            <p>Ready to explore our current menu?</p>
            <a href="${frontendUrl}/menu" class="cta-button">🍽️ Browse Our Menu</a>
          </div>
          
          <div class="social-section">
            <h3>☕ Follow Us on Social Media</h3>
            <p>Stay connected and see what's brewing at Café Elite!</p>
            <div class="social-links">
              <a href="#" title="Facebook">📘</a>
              <a href="#" title="Instagram">📷</a>
              <a href="#" title="Twitter">🐦</a>
              <a href="#" title="YouTube">📺</a>
            </div>
          </div>
          
          <div style="text-align: center; margin: 30px 0; padding: 20px; background: linear-gradient(135deg, #fff3e0, #fce4ec); border-radius: 10px;">
            <h3 style="color: #8B4513; margin-top: 0;">💡 Pro Tip</h3>
            <p style="margin-bottom: 0; color: #5d4037;">For the best coffee experience, store your beans in an airtight container away from light and heat. Fresh beans make all the difference!</p>
          </div>
        </div>
        
        <div class="footer">
          <p><strong>Café Elite</strong><br>
          123 Coffee Street, Brew City, BC 12345<br>
          📞 +1 (555) 123-CAFE | 📧 hello@cafeelite.com</p>
          
          <div class="unsubscribe">
            <p>Don't want to receive these emails anymore?<br>
            <a href="${unsubscribeUrl}">Unsubscribe here</a></p>
          </div>
          
          <p style="margin-top: 20px; opacity: 0.8;">© 2024 Café Elite. All rights reserved.<br>
          Made with ❤️ and lots of coffee</p>
        </div>
      </div>
    </body>
    </html>
    `;

    const text = `
    ☕ WELCOME TO CAFÉ ELITE NEWSLETTER!
    
    🎉 Thank you for subscribing!
    
    We're thrilled to have you join our coffee-loving community. Get ready to discover amazing blends, brewing tips, and exclusive offers!
    
    🌟 What you'll receive:
    ☕ New Blend Announcements - Be the first to try our latest coffee creations
    💰 Exclusive Discounts - Special offers just for subscribers  
    📚 Brewing Tips & Guides - Master the art of coffee making
    🎪 Event Invitations - Coffee tastings, workshops, and special events
    ☁️ Seasonal Specials - Limited-time flavors and holiday blends
    
    Ready to explore our current menu? Visit: ${frontendUrl}/menu
    
    💡 Pro Tip: For the best coffee experience, store your beans in an airtight container away from light and heat. Fresh beans make all the difference!
    
    Follow us on social media to stay connected!
    
    ---
    Café Elite
    123 Coffee Street, Brew City, BC 12345
    📞 +1 (555) 123-CAFE | 📧 hello@cafeelite.com
    
    Don't want to receive these emails? Unsubscribe: ${unsubscribeUrl}
    
    © 2024 Café Elite. All rights reserved.
    Made with ❤️ and lots of coffee
    `;

    return { html, text };
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