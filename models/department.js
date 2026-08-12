const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Department name is required'],
      trim: true,
      minlength: [2, 'Department name must contain at least 2 characters'],
      maxlength: [100, 'Department name cannot exceed 100 characters']
    },

    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [5, 'Description must contain at least 5 characters'],
      maxlength: [500, 'Description cannot exceed 500 characters']
    },

    manager: {
      type: String,
      required: [true, 'Manager is required'],
      trim: true,
      minlength: [2, 'Manager must contain at least 2 characters'],
      maxlength: [100, 'Manager cannot exceed 100 characters']
    },

    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
      maxlength: [150, 'Location cannot exceed 150 characters']
    }
  },
  {
    timestamps: true,
    collection: 'departments'
  }
);

module.exports = mongoose.model('Department', departmentSchema);
