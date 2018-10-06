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
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  destinationLocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true
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
    required: [true, `Trip needs a user`]
  },
  poi: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poi',
    required: [true, `Trip needs a Point of interest`]
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

const trip = mongoose.model('Trip', tripSchema);
module.exports = trip;  