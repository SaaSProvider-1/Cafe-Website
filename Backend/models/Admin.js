const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long']
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  licenseKey: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  role: {
    type: String,
    default: 'admin',
    enum: ['admin', 'super-admin']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date,
    default: null
  },
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: String,
    default: 'system' // Can be 'system', 'cli', or admin email
  },
  permissions: {
    manageMenu: { type: Boolean, default: true },
    manageUsers: { type: Boolean, default: true },
    manageOrders: { type: Boolean, default: true },
    viewAnalytics: { type: Boolean, default: true },
    systemSettings: { type: Boolean, default: false } // Only for super-admin
  }
}, {
  timestamps: true,
  collection: 'admins'
});

// Indexes for performance
adminSchema.index({ email: 1 });
adminSchema.index({ licenseKey: 1 });
adminSchema.index({ isActive: 1 });
adminSchema.index({ createdAt: -1 });

// Virtual for full name
adminSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for account lock status
adminSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Pre-save middleware to hash password
adminSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  try {
    // Hash password with cost of 12
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error);
  }
});

// Pre-save middleware to update updatedAt
adminSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Instance method to check password
adminSchema.methods.comparePassword = async function(candidatePassword) {
  if (!candidatePassword) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method to handle failed login attempts
adminSchema.methods.incLoginAttempts = function() {
  const maxAttempts = parseInt(process.env.MAX_LOGIN_ATTEMPTS) || 5;
  const lockoutTime = (parseInt(process.env.LOCKOUT_TIME) || 15) * 60 * 1000; // Convert to milliseconds

  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 }
    });
  }
  
  const updates = { $inc: { loginAttempts: 1 } };
  
  // Lock the account if we've reached max attempts and it's not locked already
  if (this.loginAttempts + 1 >= maxAttempts && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + lockoutTime };
  }
  
  return this.updateOne(updates);
};

// Instance method to reset login attempts
adminSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockUntil: 1 }
  });
};

// Instance method to update last login
adminSchema.methods.updateLastLogin = function() {
  return this.updateOne({
    $set: { lastLogin: Date.now() }
  });
};

// Static method to check if admin already exists
adminSchema.statics.adminExists = async function() {
  const count = await this.countDocuments({ isActive: true });
  return count > 0;
};

// Static method to find by license key
adminSchema.statics.findByLicenseKey = function(licenseKey) {
  return this.findOne({ licenseKey, isActive: true });
};

// Static method to create first admin (used by CLI)
adminSchema.statics.createFirstAdmin = async function(adminData) {
  const adminExists = await this.adminExists();
  if (adminExists) {
    throw new Error('Admin already exists in the system');
  }
  
  const admin = new this({
    ...adminData,
    role: 'super-admin',
    isVerified: true,
    createdBy: 'cli'
  });
  
  return await admin.save();
};

// Transform JSON output
adminSchema.methods.toJSON = function() {
  const adminObject = this.toObject();
  delete adminObject.password;
  delete adminObject.__v;
  return adminObject;
};

// Export the model
module.exports = mongoose.model('Admin', adminSchema);