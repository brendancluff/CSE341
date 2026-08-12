const mongoose = require('mongoose');
const Project = require('../models/project');

const getAll = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: 'Unable to retrieve projects',
      error: error.message
    });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid project ID' });
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({
      message: 'Unable to retrieve project',
      error: error.message
    });
  }
};

const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
      ownerEmail: req.body.ownerEmail
    });

    res.status(201).json({
      message: 'Project created successfully',
      project
    });
  } catch (error) {
    handleMongooseError(error, res);
  }
};

const updateProject = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid project ID' });
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        ownerEmail: req.body.ownerEmail
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({
      message: 'Project updated successfully',
      project
    });
  } catch (error) {
    handleMongooseError(error, res);
  }
};

const deleteProject = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid project ID' });
    }

    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Unable to delete project',
      error: error.message
    });
  }
};

const handleMongooseError = (error, res) => {
  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map(
      (validationError) => validationError.message
    );

    return res.status(400).json({
      message: 'Validation failed',
      errors
    });
  }

  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid data format' });
  }

  return res.status(500).json({
    message: 'An unexpected server error occurred',
    error: error.message
  });
};

module.exports = {
  getAll,
  getSingle,
  createProject,
  updateProject,
  deleteProject
};
