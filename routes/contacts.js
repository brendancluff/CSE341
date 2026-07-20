const express = require('express');

const router = express.Router();

const contactsController = require('../controllers/contacts');

const {
  contactValidationRules,
  validateContact
} = require('../middleware/contact-validation');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post(
  '/',
  contactValidationRules,
  validateContact,
  contactsController.createContact
);

router.put(
  '/:id',
  contactValidationRules,
  validateContact,
  contactsController.updateContact
);

router.delete('/:id', contactsController.deleteContact);

module.exports = router;