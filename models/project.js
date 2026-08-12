const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
      minlength: [2, 'Project name must contain at least 2 characters'],
      maxlength: [100, 'Project name cannot exceed 100 characters']
    },

    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [5, 'Description must contain at least 5 characters'],
      maxlength: [500, 'Description cannot exceed 500 characters']
    },

    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: ['planned', 'active', 'completed', 'on-hold'],
      default: 'planned'
    },

    ownerEmail: {
      type: String,
      required: [true, 'Owner email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address'
      ]
    }
  },
  {
    timestamps: true,
    collection: 'projects'
  }
);

module.exports = mongoose.model('Project', projectSchema);
