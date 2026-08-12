const { body, validationResult } = require('express-validator');

const departmentValidationRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Department name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Department name must contain between 2 and 100 characters'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 5, max: 500 })
    .withMessage('Description must contain between 5 and 500 characters'),

  body('manager')
    .trim()
    .notEmpty()
    .withMessage('Manager is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Manager must contain between 2 and 100 characters'),

  body('location')
    .trim()
    .notEmpty()
    .withMessage('Location is required')
    .isLength({ max: 150 })
    .withMessage('Location cannot exceed 150 characters')
];

const validateDepartment = (req, res, next) => {
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
  departmentValidationRules,
  validateDepartment
};
