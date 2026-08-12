const { body, validationResult } = require('express-validator');

const projectValidationRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Project name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Project name must contain between 2 and 100 characters'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 5, max: 500 })
    .withMessage('Description must contain between 5 and 500 characters'),

  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['planned', 'active', 'completed', 'on-hold'])
    .withMessage('Status must be planned, active, completed, or on-hold'),

  body('ownerEmail')
    .trim()
    .notEmpty()
    .withMessage('Owner email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
];

const validateProject = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  next();
};

module.exports = {
  projectValidationRules,
  validateProject
};
