const { body, param, query, validationResult } = require('express-validator');

/**
 * Handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() 
    });
  }
  next();
};

/**
 * Product validation rules for creation
 */
const createProductRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Product name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters long'),
  
  body('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  
  body('description')
    .optional()
    .isLength({ max: 2000 }).withMessage('Description must be less than 2000 characters'),
  
  body('stock')
    .optional()
    .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  
  body('category')
    .notEmpty().withMessage('Category ID is required'),
  
  handleValidationErrors
];

/**
 * Product validation rules for updating
 */
const updateProductRules = [
  param('id')
    .notEmpty().withMessage('Product ID is required'),
  
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters long'),
  
  body('price')
    .optional()
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  
  handleValidationErrors
];

/**
 * Category validation rules for creation
 */
const createCategoryRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Category name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters long'),
  
  body('description')
    .optional()
    .isLength({ max: 500 }).withMessage('Description must be less than 500 characters'),
  
  handleValidationErrors
];

/**
 * Category validation rules for updating
 */
const updateCategoryRules = [
  param('id')
    .notEmpty().withMessage('Category ID is required'),
  
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters long'),
  
  body('description')
    .optional()
    .isLength({ max: 500 }).withMessage('Description must be less than 500 characters'),
  
  handleValidationErrors
];

/**
 * Pagination validation rules
 */
const paginationRules = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  
  handleValidationErrors
];

module.exports = {
  createProductRules,
  updateProductRules,
  createCategoryRules,
  updateCategoryRules,
  paginationRules
};
