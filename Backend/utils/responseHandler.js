/**
 * Standard response handler for consistent API responses
 * @param {Object} res - Express response object
 * @param {Number} statusCode - HTTP status code
 * @param {String} status - Status type ('success', 'fail', 'error')
 * @param {String} message - Response message
 * @param {Object} data - Response data (optional)
 * @param {Object} meta - Metadata like pagination (optional)
 */
const sendResponse = (res, statusCode, status, message, data = null, meta = null) => {
  const response = {
    status,
    message,
    timestamp: new Date().toISOString(),
  };

  if (data !== null) {
    response.data = data;
  }

  if (meta !== null) {
    response.meta = meta;
  }

  return res.status(statusCode).json(response);
};

/**
 * Success response helper
 */
const sendSuccess = (res, message, data = null, meta = null) => {
  return sendResponse(res, 200, 'success', message, data, meta);
};

/**
 * Created response helper
 */
const sendCreated = (res, message, data = null) => {
  return sendResponse(res, 201, 'success', message, data);
};

/**
 * Bad request response helper
 */
const sendBadRequest = (res, message) => {
  return sendResponse(res, 400, 'fail', message);
};

/**
 * Unauthorized response helper
 */
const sendUnauthorized = (res, message = 'Unauthorized') => {
  return sendResponse(res, 401, 'fail', message);
};

/**
 * Forbidden response helper
 */
const sendForbidden = (res, message = 'Forbidden') => {
  return sendResponse(res, 403, 'fail', message);
};

/**
 * Not found response helper
 */
const sendNotFound = (res, message = 'Resource not found') => {
  return sendResponse(res, 404, 'fail', message);
};

/**
 * Internal server error response helper
 */
const sendServerError = (res, message = 'Internal server error') => {
  return sendResponse(res, 500, 'error', message);
};

module.exports = {
  sendResponse,
  sendSuccess,
  sendCreated,
  sendBadRequest,
  sendUnauthorized,
  sendForbidden,
  sendNotFound,
  sendServerError,
};