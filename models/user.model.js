const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const constants = require('../constants')
const FIRST_ADMIN_EMAIL = process.env.FIRST_ADMIN_EMAIL;

const userSchema =  new mongoose.Schema({
  firstName: {
    type: String,
    required: 'First name is required'
  },
  surname: {
    type: String,
    required: 'Surname is required'
  },
  photoPath: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  points: {
    type: Number
  },
  interests: [{
    type: String
  }],
  role: {
    type: String,
    enum: [constants.ROLE_ADMIN, constants.ROLE_GUEST],
    default: constants.ROLE_GUEST
  }
}, { 
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      return ret;
    }
  }
});

userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) {
    next();
  } else {
    bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => {
        return bcrypt.hash(user.password, salt)
      })
      .then(hash => {
        user.password = hash;
        next();
      })
      .catch(error => next(error));
  }
  
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);
module.exports = User; 