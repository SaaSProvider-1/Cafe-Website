const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  image: {
    type: String
  },
  category: {
    type: String
  }
});

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true
    // Note: not required because it's auto-generated
  },
  customerInfo: {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String
    }
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'preparing', 'ready', 'completed', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  orderType: {
    type: String,
    enum: ['pickup', 'delivery'],
    default: 'pickup'
  },
  specialInstructions: {
    type: String
  },
  estimatedTime: {
    type: Number, // in minutes
    default: 15
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Generate order number
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    try {
      const today = new Date();
      const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
      
      // Create proper date boundaries
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
      const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);
      
      const count = await this.constructor.countDocuments({
        createdAt: {
          $gte: startOfDay,
          $lte: endOfDay
        }
      });
      
      this.orderNumber = `CE${dateStr}${String(count + 1).padStart(3, '0')}`;
    } catch (error) {
      console.error('Error generating order number:', error);
      // Fallback order number
      this.orderNumber = `CE${Date.now()}`;
    }
  }
  next();
});

// Update timestamp on save
orderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual for order ID display
orderSchema.virtual('displayId').get(function() {
  return this.orderNumber;
});

// Instance methods
orderSchema.methods.updateStatus = function(newStatus) {
  this.status = newStatus;
  this.updatedAt = Date.now();
  return this.save();
};

orderSchema.methods.addEstimatedTime = function() {
  // Calculate estimated time based on number of items and complexity
  const baseTime = 10; // Base preparation time
  const timePerItem = 2; // Additional time per item
  const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
  
  this.estimatedTime = baseTime + (totalItems * timePerItem);
  return this.estimatedTime;
};

// Static methods
orderSchema.statics.getTodaysOrders = function() {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));
  
  return this.find({
    createdAt: {
      $gte: startOfDay,
      $lte: endOfDay
    }
  }).sort({ createdAt: -1 });
};

orderSchema.statics.getOrderStats = async function() {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));
  
  const totalOrders = await this.countDocuments({
    createdAt: { $gte: startOfDay, $lte: endOfDay }
  });
  
  const totalRevenue = await this.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfDay, $lte: endOfDay },
        status: { $ne: 'cancelled' }
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: '$totalAmount' }
      }
    }
  ]);
  
  const pendingOrders = await this.countDocuments({
    status: 'pending'
  });
  
  const preparingOrders = await this.countDocuments({
    status: 'preparing'
  });
  
  return {
    totalOrders,
    totalRevenue: totalRevenue[0]?.total || 0,
    pendingOrders,
    preparingOrders
  };
};

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;