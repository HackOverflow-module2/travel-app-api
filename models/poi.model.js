const mongoose = require('mongoose');

const pointOfInterestSchema = new mongoose.Schema({
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    },
  },
  poiTypes: {
    type: [String],
    default: []
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  gallery: {
    type: [String],
    default: []
  },
  tags: {
    type: [String],
    default: []
  }
}, { 
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});


const pointOfInterest = mongoose.model('PointOfInterest', pointOfInterestSchema);
module.exports = pointOfInterest; 