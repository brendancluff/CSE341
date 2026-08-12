const express = require('express');

const router = express.Router();

const departmentsController = require('../controllers/departments');

const {
  departmentValidationRules,
  validateDepartment
} = require('../middleware/department-validation');

const {
  isAuthenticated
} = require('../middleware/auth');

router.get('/', departmentsController.getAll);

router.get('/:id', departmentsController.getSingle);

router.post(
  '/',
  isAuthenticated,
  departmentValidationRules,
  validateDepartment,
  departmentsController.createDepartment
);

router.put(
  '/:id',
  isAuthenticated,
  departmentValidationRules,
  validateDepartment,
  departmentsController.updateDepartment
);

router.delete('/:id', departmentsController.deleteDepartment);

module.exports = router;
