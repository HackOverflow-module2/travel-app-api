const User = require('../models/user.model');
const createError = require('http-errors');
const mongoose = require('mongoose');

module.exports.create = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        throw createError(409, `User with email ${req.body.email} already exists`);
      } else {
        user = new User(req.body);
        user.save()
          .then(user => res.status(201).json(user))
          .catch(error => {
            next(error)
          });
      }
    })
    .catch(error => next(error));
  
}

module.exports.detail = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(error => next(error));
}

module.exports.edit = (req, res, next) => {

  // add in later to edit photo
  /*if (req.file) {
    updateSet.photoPath = `/images/profile-photos/${req.file.filename}`;
  }*/

    //alternative for edit/update, using an object assign
 /* 
 
  const updateSet = {
    name: req.body.name,
    surname: req.body.surname,
  }
 
  User.findByIdAndUpdate(id, { $set: updateSet }, {runValidators: true, new: true })
    .then((user) => {})
    .catch(error => next(error))*/

    const id = req.params.id;

    User.findById(id)
    .then(user => {
      if (user) {
        Object.assign(user, {
          firstName: req.body.firstName,
          surname: req.body.surname,
          password: req.body.password,
          image: req.body.image
        });

        user.save()
          .then(() => {
            res.json(user);
          })
          .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
              next(createError(400, error.errors));
            } else {
              next(error);
            }
          })
      } else {
        next(createError(404, `User with id ${id} not found`));
      }
    })
    .catch(error => next(error));
}

