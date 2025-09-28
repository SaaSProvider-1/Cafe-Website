const express = require('express');
const authMiddleware = require('../middleware/auth');
const { sendResponse } = require('../utils/responseHandler');

const router = express.Router();

// @desc    Get all menu items
// @route   GET /api/menu
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    // Sample menu data for now
    const sampleMenu = [
      {
        id: 1,
        name: "Premium Espresso",
        description: "Rich, bold espresso made from premium Arabica beans",
        price: 3.50,
        category: "coffee",
        image: "/images/espresso.jpg",
        isAvailable: true,
        isFeatured: true
      },
      {
        id: 2,
        name: "Cappuccino",
        description: "Classic Italian cappuccino with steamed milk and foam",
        price: 4.25,
        category: "coffee",
        image: "/images/cappuccino.jpg",
        isAvailable: true,
        isPopular: true
      },
      {
        id: 3,
        name: "Chocolate Croissant",
        description: "Buttery, flaky croissant filled with rich Belgian chocolate",
        price: 3.75,
        category: "pastries",
        image: "/images/chocolate-croissant.jpg",
        isAvailable: true,
        isFeatured: false
      }
    ];

    sendResponse(res, 200, 'success', 'Menu items retrieved successfully', {
      items: sampleMenu,
      count: sampleMenu.length
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get featured menu items
// @route   GET /api/menu/featured
// @access  Public
router.get('/featured', async (req, res, next) => {
  try {
    sendResponse(res, 200, 'success', 'Featured menu endpoint', {
      message: 'Featured menu items coming soon'
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get menu item by ID
// @route   GET /api/menu/:id
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    sendResponse(res, 200, 'success', `Menu item ${id} endpoint`, {
      message: 'Individual menu item endpoints coming soon'
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Create new menu item
// @route   POST /api/menu
// @access  Private/Admin
router.post('/', authMiddleware, async (req, res, next) => {
  try {
    // TODO: Add admin role check and implement menu item creation
    sendResponse(res, 201, 'success', 'Menu item creation endpoint', {
      message: 'Menu item creation coming soon'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;