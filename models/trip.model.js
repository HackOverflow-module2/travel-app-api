const mongoose = require('mongoose');

 const tripSchema = new mongoose.Schema({
  originPlace: {
    type: String,
    required: 'Origin city is required'
  },
  destinationPlace: {
    type: String,
    required: 'Destination city is required'
  },
  originLocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
    }
  },
  destinationLocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
    }
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
 const trip = mongoose.model('Trip', tripSchema);
module.exports = trip;  