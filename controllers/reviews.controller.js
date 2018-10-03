const Review = require('../models/review.model');
const createError = require('http-errors');
const mongoose = require('mongoose');

module.exports.create = (req, res, next) => {
    const review = new Review(req.body)
    review.save()
        .then(review => res.status(201).json(review))
        .catch(error => next(error));
  }

  module.exports.list = (req, res, next) => {
    Review.find()
        .then(reviews => res.json(reviews))
        .catch(error => next(error));
  }