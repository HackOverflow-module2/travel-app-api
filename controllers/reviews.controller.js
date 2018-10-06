const Review = require('../models/review.model');
const Poi = require('../models/poi.model');
const createError = require('http-errors');
const mongoose = require('mongoose');

module.exports.create = (req, res, next) => {

    Poi.findById(req.body.poi)
        .then(poi => {
            if(!poi) {
                throw createError(404, 'Poi not found');
            } else {
                poi.rating = (req.body.rating + poi.rating);

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