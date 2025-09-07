const { body, param, validationResult } = require('express-validator');

// Validation middleware for login
const validateLogin = [
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Username must be between 2 and 100 characters')
    .trim()
    .escape(),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 1, max: 100 })
    .withMessage('Password must be between 1 and 100 characters')
    .trim()
    .escape(),

  // Custom middleware to handle validation results
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array().map(error => ({
          field: error.param,
          message: error.msg,
          value: error.value
        }))
      });
    }
    next();
  }
];

// Validation middleware for query parameters in card create
const validateCreateCard = [
  body('question')
    .notEmpty()
    .withMessage('Question is required')
    .isLength({ min: 2, max: 500 })
    .withMessage('Question must be between 2 and 500 characters')
    .trim()
    .escape(),

  body('answer')
    .notEmpty()
    .withMessage('Answer is required')
    .isLength({ min: 1, max: 500 })
    .withMessage('Answer must be between 1 and 500 characters')
    .trim()
    .escape(),

  body('categoryId')
    .notEmpty()
    .withMessage('categoryId is required')
    .isMongoId()
    .withMessage('categoryId must be a valid MongoDB ObjectId'),

  body('userId')
    .notEmpty()
    .withMessage('userId is required')
    .isMongoId()
    .withMessage('userId must be a valid MongoDB ObjectId'),

  // Custom middleware to handle validation results
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array().map(error => ({
          field: error.param,
          message: error.msg,
          value: error.value
        }))
      });
    }
    next();
  }
];

// Validation middleware for query parameters in card update
const validateUpdateCard = [
  body('question')
    .notEmpty()
    .withMessage('Question is required')
    .isLength({ min: 2, max: 500 })
    .withMessage('Question must be between 2 and 500 characters')
    .trim()
    .escape(),

  body('answer')
    .notEmpty()
    .withMessage('Answer is required')
    .isLength({ min: 1, max: 500 })
    .withMessage('Answer must be between 1 and 500 characters')
    .trim()
    .escape(),

  body('categoryId')
    .notEmpty()
    .withMessage('categoryId is required')
    .isMongoId()
    .withMessage('categoryId must be a valid MongoDB ObjectId'),

  // Custom middleware to handle validation results
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array().map(error => ({
          field: error.param,
          message: error.msg,
          value: error.value
        }))
      });
    }
    next();
  }
];

// Validation middleware for card ID parameter
const validateCardIdParam = [
  param('id')
    .notEmpty()
    .withMessage('Card ID is required')
    .isMongoId()
    .withMessage('Card ID must be a valid MongoDB ObjectId'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array().map(error => ({
          field: error.param,
          message: error.msg,
          value: error.value
        }))
      });
    }
    next();
  }
];

// Validation middleware for category ID parameter
const validateCategoryIdParam = [
  param('id')
    .notEmpty()
    .withMessage('Category ID is required')
    .isMongoId()
    .withMessage('Category ID must be a valid MongoDB ObjectId'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array().map(error => ({
          field: error.param,
          message: error.msg,
          value: error.value
        }))
      });
    }
    next();
  }
];

// Generic validation error handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array()
    });
  }

  next();
};

module.exports = {
  validateLogin,
  validateCreateCard,
  validateUpdateCard,
  validateCardIdParam,
  validateCategoryIdParam,
  handleValidationErrors
};