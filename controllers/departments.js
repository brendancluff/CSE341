const mongoose = require('mongoose');
const Department = require('../models/department');

const getAll = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({
      message: 'Unable to retrieve departments',
      error: error.message
    });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid department ID' });
    }

    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({
      message: 'Unable to retrieve department',
      error: error.message
    });
  }
};

const createDepartment = async (req, res) => {
  try {
    const department = await Department.create({
      name: req.body.name,
      description: req.body.description,
      manager: req.body.manager,
      location: req.body.location
    });

    res.status(201).json({
      message: 'Department created successfully',
      department
    });
  } catch (error) {
    handleMongooseError(error, res);
  }
};

const updateDepartment = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid department ID' });
    }

    const department = await Department.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        manager: req.body.manager,
        location: req.body.location
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.status(200).json({
      message: 'Department updated successfully',
      department
    });
  } catch (error) {
    handleMongooseError(error, res);
  }
};

const deleteDepartment = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid department ID' });
    }

    const department = await Department.findByIdAndDelete(req.params.id);

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.status(200).json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Unable to delete department',
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
  createDepartment,
  updateDepartment,
  deleteDepartment
};
