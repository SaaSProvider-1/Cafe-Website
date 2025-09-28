const { validationResult } = require('express-validator');
const { sendResponse } = require('../utils/responseHandler');

/**
 * Middleware to handle validation errors from express-validator
 */
const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => ({
      field: error.path || error.param,
      message: error.msg,
      value: error.value
    }));
    
    return sendResponse(
      res, 
      400, 
      'fail', 
      'Validation failed', 
      { errors: errorMessages }
    );
  }
  
  next();
};

module.exports = validationMiddleware;