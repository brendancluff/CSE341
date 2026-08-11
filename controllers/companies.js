const mongoose = require('mongoose');
const Company = require('../models/company');

const getAll = async (req, res) => {
  try {
    const companies = await Company.find();

    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({
      message: 'Unable to retrieve companies',
      error: error.message
    });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid company ID'
      });
    }

    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        message: 'Company not found'
      });
    }

    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({
      message: 'Unable to retrieve company',
      error: error.message
    });
  }
};

const createCompany = async (req, res) => {
  try {
    const company = await Company.create({
      name: req.body.name,
      industry: req.body.industry,
      website: req.body.website,
      phone: req.body.phone,
      city: req.body.city,
      state: req.body.state
    });

    res.status(201).json({
      message: 'Company created successfully',
      company
    });
  } catch (error) {
    handleMongooseError(error, res);
  }
};

const updateCompany = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid company ID'
      });
    }

    const company = await Company.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        industry: req.body.industry,
        website: req.body.website,
        phone: req.body.phone,
        city: req.body.city,
        state: req.body.state
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!company) {
      return res.status(404).json({
        message: 'Company not found'
      });
    }

    res.status(200).json({
      message: 'Company updated successfully',
      company
    });
  } catch (error) {
    handleMongooseError(error, res);
  }
};

const deleteCompany = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid company ID'
      });
    }

    const company = await Company.findByIdAndDelete(req.params.id);

    if (!company) {
      return res.status(404).json({
        message: 'Company not found'
      });
    }

    res.status(200).json({
      message: 'Company deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Unable to delete company',
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
    return res.status(400).json({
      message: 'Invalid data format'
    });
  }

  return res.status(500).json({
    message: 'An unexpected server error occurred',
    error: error.message
  });
};

module.exports = {
  getAll,
  getSingle,
  createCompany,
  updateCompany,
  deleteCompany
};