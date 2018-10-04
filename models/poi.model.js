const mongoose = require('mongoose');

const pointOfInterestSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    required: 'Latitude is required'
  },
  longitude: {
    type: Number,
    required: 'Longitude is required'
  },
  poiType: {
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
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, `Point of interest needs a user`]
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