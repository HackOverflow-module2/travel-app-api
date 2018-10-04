const mongoose = require('mongoose');

const tripPointSchema = new mongoose.Schema({
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: 'Trip is required'
  },
  pointOfInterest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PointOfInterest',
    required: 'PointOfInterest is required'
  },
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


const tripPoint = mongoose.model('TripPoint', tripPointSchema);
module.exports = tripPoint;