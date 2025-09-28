const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Menu item name is required'],
    trim: true,
    maxLength: [100, 'Name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxLength: [500, 'Description cannot exceed 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['coffee', 'tea', 'pastries', 'sandwiches', 'salads', 'desserts', 'breakfast', 'lunch', 'beverages'],
      message: 'Please select a valid category'
    }
  },
  subcategory: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Image is required']
  },
  images: [{
    type: String
  }],
  ingredients: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    allergen: {
      type: Boolean,
      default: false
    }
  }],
  nutritionalInfo: {
    calories: Number,
    protein: Number, // in grams
    carbohydrates: Number, // in grams
    fat: Number, // in grams
    fiber: Number, // in grams
    sugar: Number, // in grams
    sodium: Number // in mg
  },
  allergens: [{
    type: String,
    enum: ['nuts', 'dairy', 'gluten', 'eggs', 'soy', 'shellfish', 'fish', 'sesame']
  }],
  dietaryTags: [{
    type: String,
    enum: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'keto', 'low-carb', 'organic']
  }],
  preparationTime: {
    type: Number, // in minutes
    min: [1, 'Preparation time must be at least 1 minute']
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  isNewItem: {
    type: Boolean,
    default: false
  },
  stock: {
    type: Number,
    default: -1 // -1 means unlimited stock
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  sizes: [{
    name: {
      type: String,
      required: true,
      enum: ['small', 'medium', 'large', 'extra-large']
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Size price cannot be negative']
    },
    calories: Number
  }],
  customizations: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    options: [{
      name: {
        type: String,
        required: true,
        trim: true
      },
      extraPrice: {
        type: Number,
        default: 0,
        min: [0, 'Extra price cannot be negative']
      }
    }],
    required: {
      type: Boolean,
      default: false
    },
    multipleSelection: {
      type: Boolean,
      default: false
    }
  }],
  orderCount: {
    type: Number,
    default: 0
  },
  discounts: [{
    type: {
      type: String,
      enum: ['percentage', 'fixed'],
      required: true
    },
    value: {
      type: Number,
      required: true,
      min: [0, 'Discount value cannot be negative']
    },
    startDate: Date,
    endDate: Date,
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  tags: [String],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for reviews
menuItemSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'menuItem'
});

// Virtual for current price (considering discounts)
menuItemSchema.virtual('currentPrice').get(function() {
  const activeDiscount = this.discounts.find(discount => 
    discount.isActive && 
    (!discount.startDate || discount.startDate <= new Date()) &&
    (!discount.endDate || discount.endDate >= new Date())
  );

  if (activeDiscount) {
    if (activeDiscount.type === 'percentage') {
      return this.price * (1 - activeDiscount.value / 100);
    } else {
      return Math.max(0, this.price - activeDiscount.value);
    }
  }

  return this.price;
});

// Virtual for discount percentage
menuItemSchema.virtual('discountPercentage').get(function() {
  const currentPrice = this.currentPrice;
  if (currentPrice < this.price) {
    return Math.round(((this.price - currentPrice) / this.price) * 100);
  }
  return 0;
});

// Indexes for better query performance
menuItemSchema.index({ category: 1 });
menuItemSchema.index({ isAvailable: 1 });
menuItemSchema.index({ isFeatured: 1 });
menuItemSchema.index({ isPopular: 1 });
menuItemSchema.index({ 'rating.average': -1 });
menuItemSchema.index({ orderCount: -1 });
menuItemSchema.index({ price: 1 });
menuItemSchema.index({ createdAt: -1 });
menuItemSchema.index({ name: 'text', description: 'text' }); // Text search index

// Pre-save middleware
menuItemSchema.pre('save', function(next) {
  // Set originalPrice if not provided
  if (!this.originalPrice) {
    this.originalPrice = this.price;
  }
  
  // Update isNewItem based on creation date (items created in last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  this.isNewItem = this.createdAt > thirtyDaysAgo;
  
  next();
});

// Static methods
menuItemSchema.statics.getMenuStats = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
        averagePrice: { $avg: '$price' },
        availableItems: {
          $sum: { $cond: [{ $eq: ['$isAvailable', true] }, 1, 0] }
        }
      }
    },
    {
      $sort: { count: -1 }
    }
  ]);
};

menuItemSchema.statics.getFeaturedItems = function(limit = 6) {
  return this.find({ isFeatured: true, isAvailable: true })
    .sort({ orderCount: -1, 'rating.average': -1 })
    .limit(limit);
};

menuItemSchema.statics.getPopularItems = function(limit = 10) {
  return this.find({ isAvailable: true })
    .sort({ orderCount: -1, 'rating.average': -1 })
    .limit(limit);
};

menuItemSchema.statics.searchItems = function(query, options = {}) {
  const {
    category,
    minPrice,
    maxPrice,
    dietaryTags,
    allergens,
    sortBy = '-rating.average',
    page = 1,
    limit = 20
  } = options;

  const searchQuery = {
    isAvailable: true,
    ...(category && { category }),
    ...(minPrice && { price: { $gte: minPrice } }),
    ...(maxPrice && { price: { ...{price: { $gte: minPrice }}, $lte: maxPrice } }),
    ...(dietaryTags && { dietaryTags: { $in: dietaryTags } }),
    ...(allergens && { allergens: { $nin: allergens } })
  };

  if (query) {
    searchQuery.$text = { $search: query };
  }

  return this.find(searchQuery)
    .sort(sortBy)
    .skip((page - 1) * limit)
    .limit(limit);
};

// Instance methods
menuItemSchema.methods.updateRating = async function(newRating) {
  const reviews = await mongoose.model('Review').find({ menuItem: this._id });
  
  if (reviews.length === 0) {
    this.rating.average = newRating;
    this.rating.count = 1;
  } else {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    this.rating.average = Math.round((totalRating / reviews.length) * 10) / 10;
    this.rating.count = reviews.length;
  }
  
  return this.save();
};

module.exports = mongoose.model('MenuItem', menuItemSchema);