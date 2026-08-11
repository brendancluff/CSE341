const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      minlength: [2, 'Company name must contain at least 2 characters'],
      maxlength: [100, 'Company name cannot exceed 100 characters']
    },

    industry: {
      type: String,
      required: [true, 'Industry is required'],
      trim: true,
      minlength: [2, 'Industry must contain at least 2 characters'],
      maxlength: [100, 'Industry cannot exceed 100 characters']
    },

    website: {
      type: String,
      required: [true, 'Website is required'],
      trim: true,
      match: [
        /^https?:\/\/.+/,
        'Please provide a valid website beginning with http:// or https://'
      ]
    },

    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      minlength: [7, 'Phone number must contain at least 7 characters'],
      maxlength: [20, 'Phone number cannot exceed 20 characters']
    },

    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
      minlength: [2, 'City must contain at least 2 characters'],
      maxlength: [50, 'City cannot exceed 50 characters']
    },

    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true,
      minlength: [2, 'State must contain at least 2 characters'],
      maxlength: [50, 'State cannot exceed 50 characters']
    }
  },
  {
    timestamps: true,
    collection: 'companies'
  }
);

module.exports = mongoose.model('Company', companySchema);