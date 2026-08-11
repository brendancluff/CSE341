const express = require('express');

const router = express.Router();

const companiesController = require('../controllers/companies');

const {
  companyValidationRules,
  validateCompany
} = require('../middleware/company-validation');

router.get('/', companiesController.getAll);

router.get('/:id', companiesController.getSingle);

router.post(
  '/',
  companyValidationRules,
  validateCompany,
  companiesController.createCompany
);

router.put(
  '/:id',
  companyValidationRules,
  validateCompany,
  companiesController.updateCompany
);

router.delete('/:id', companiesController.deleteCompany);

module.exports = router;