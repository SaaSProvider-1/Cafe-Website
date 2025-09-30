const express = require('express');
const Order = require('../models/Order');
const { sendResponse } = require('../utils/responseHandler');
const logger = require('../utils/logger');

const router = express.Router();

// @desc    Create new order (Public endpoint for QR menu)
// @route   POST /api/orders
// @access  Public
router.post('/', async (req, res, next) => {
  try {
    const { customerInfo, items, specialInstructions, orderType } = req.body;

    // Validate required fields
    if (!customerInfo || !customerInfo.name || !customerInfo.phone) {
      return res.status(400).json({
        success: false,
        message: 'Customer name and phone are required'
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order must contain at least one item'
      });
    }

    // Calculate total amount
    const totalAmount = items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);

    // Create new order
    const order = new Order({
      customerInfo: {
        name: customerInfo.name.trim(),
        phone: customerInfo.phone.trim(),
        email: customerInfo.email ? customerInfo.email.trim() : undefined
      },
      items,
      totalAmount,
      specialInstructions: specialInstructions ? specialInstructions.trim() : undefined,
      orderType: orderType || 'pickup'
    });

    // Calculate estimated time
    order.addEstimatedTime();

    // Save order with better error handling
    try {
      await order.save();
      logger.info(`New order created: ${order.orderNumber} for ${customerInfo.name}`);
    } catch (saveError) {
      logger.error('Order save error:', saveError);
      return res.status(500).json({
        success: false,
        message: 'Failed to save order: ' + saveError.message
      });
    }

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      data: {
        orderNumber: order.orderNumber,
        estimatedTime: order.estimatedTime,
        totalAmount: order.totalAmount,
        status: order.status,
        customerInfo: order.customerInfo
      }
    });

  } catch (error) {
    logger.error('Order creation error:', error);
    next(error);
  }
});

// @desc    Get order by order number (Public endpoint)
// @route   GET /api/orders/track/:orderNumber
// @access  Public
router.get('/track/:orderNumber', async (req, res, next) => {
  try {
    const { orderNumber } = req.params;

    const order = await Order.findOne({ orderNumber });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order found',
      data: {
        orderNumber: order.orderNumber,
        status: order.status,
        estimatedTime: order.estimatedTime,
        totalAmount: order.totalAmount,
        createdAt: order.createdAt,
        items: order.items
      }
    });

  } catch (error) {
    logger.error('Order tracking error:', error);
    next(error);
  }
});

module.exports = router;