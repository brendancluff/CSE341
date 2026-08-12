const express = require('express');

const router = express.Router();

const projectsController = require('../controllers/projects');

const {
  projectValidationRules,
  validateProject
} = require('../middleware/project-validation');

const {
  isAuthenticated
} = require('../middleware/auth');

router.get('/', projectsController.getAll);

router.get('/:id', projectsController.getSingle);

router.post(
  '/',
  isAuthenticated,
  projectValidationRules,
  validateProject,
  projectsController.createProject
);

router.put(
  '/:id',
  isAuthenticated,
  projectValidationRules,
  validateProject,
  projectsController.updateProject
);

router.delete('/:id', projectsController.deleteProject);

module.exports = router;
