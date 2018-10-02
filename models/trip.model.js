const mongoose = require('mongoose');

 const tripSchema =  new mongoose.Schema({
  originCity: {
    type: String,
    required: 'Origin city is required'
  },
  destinationCity: {
    type: String,
    required: 'Destination city is required'
  },
  originLatitude: {
    type: Number,
    required: 'Origin latitude is required'
  },
  destinationLatitude: {
    type: Number,
    required: 'Destination latitude is required'
  },
  originLongitude: {
    type: Number,
    required: 'Origin longitude is required'
  },
  destinationLongitude: {
    type: Number,
    required: 'Destination longitude is required'
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
  interests: {
    type: [String],
    default: []
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, `Point of interest needs a user`]
  },
  pointOfInterest: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'PointOfInterest'
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
 const trip = mongoose.model('PointOfInterest', tripSchema);
module.exports = trip;  