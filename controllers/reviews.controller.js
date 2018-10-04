const Review = require('../models/review.model');
const PointOfInterest = require('../models/poi.model');
const createError = require('http-errors');
const mongoose = require('mongoose');

module.exports.create = (req, res, next) => {

    PointOfInterest.find(req.body.pointOfInterest)
        .then(pointOfInterest => {
            if(!pointOfInterest) {
                throw createError(404, 'Poi not found');
            } else {
                pointOfInterest.rating = (req.body.rating + pointOfInterest.rating);

                const review = new Review(req.body)
                review.save()
                    .then(review => {
                        res.status(201).json(review)
                    })
                    .catch(error => next(error));
              }
        })
        .catch(error => next(error));
}

  module.exports.list = (req, res, next) => {
    Review.find()
        .then(reviews => res.json(reviews))
        .catch(error => next(error));
  }