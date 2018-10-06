const mongoose = require('mongoose');

const reviewSchema =  new mongoose.Schema({
  rating: {
    type: Number,
    range: {
      min: { type: Number, min: 1 },
      max: { type: Number, max: 5 }
    }
  },
  title: {
    type: Number,
    required: 'Title is required'
  },
  description: {
    type: Number,
    required: 'Description is required'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, `Review needs a user`]
  },
  poi: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'poi',
    required: [true, `Review needs a point of interest`]
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


const review = mongoose.model('Review', reviewSchema);
module.exports = review; 