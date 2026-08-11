const { body, validationResult } = require('express-validator');

const companyValidationRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Company name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Company name must be between 2 and 100 characters'),

  body('industry')
    .trim()
    .notEmpty()
    .withMessage('Industry is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Industry must be between 2 and 100 characters'),

  body('website')
    .trim()
    .notEmpty()
    .withMessage('Website is required')
    .isURL({
      protocols: ['http', 'https'],
      require_protocol: true
    })
    .withMessage(
      'Please provide a valid website beginning with http:// or https://'
    ),

  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .isLength({ min: 7, max: 20 })
    .withMessage('Phone number must be between 7 and 20 characters'),

  body('city')
    .trim()
    .notEmpty()
    .withMessage('City is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('City must be between 2 and 50 characters'),

  body('state')
    .trim()
    .notEmpty()
    .withMessage('State is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('State must be between 2 and 50 characters')
];

const validateCompany = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array().map((error) => error.msg)
    });
  }

  next();
};

module.exports = {
  companyValidationRules,
  validateCompany
};