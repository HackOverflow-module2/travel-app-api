const Trip = require('../models/trip.model');
const TripPoint = require('../models/tripPoint.model');
const createError = require('http-errors');
const mongoose = require('mongoose');

module.exports.create = (req, res, next) => {    
    const trip = new Trip({
        originPlace: req.body.originPlace,
        destinationPlace:req.body.destinationPlace,
        originLocation: req.body.originLocation,
        destionationLocation: req.body.destionationLocation,
        name: req.body.name,
        gallery: req.file,
        tags: req.body.tags,
        user: req.user._id
    });

    const tripPoints = req.body.pointOfInteres.map(poi => {
        new TripPoint({
            trip: req.body._id,
            pointOfInteres: poi._id
        })
    })
   
    const tripPromise = trip.save();
    const tripPointsPromise = tripPoints.map(tripPoint => {
        tripPoint.save();
    })

    const allThePromises = tripPointsPromise.unshift(tripPromise);

    Promise.all(allThePromises)
        .then(results => {
            res.status(201).json(results[0]);
        })
        .catch(error => next(error));
}



module.exports.detail = (req, res, next) => {
    Trip.findById(req.params.id)
      .then(trip => {
        if(!trip){
          throw createError(404, 'User not found');
        } else {
            const t = trip;
            TripPoint.find( {trip: t} )
            .populate('pointOfInterest')
                .then(tripPoints => {
                  const points = tripPoints
                  .map(tripPoint => tripPoint.point);
                  res.json(trip, points);
                })
                .catch(error => next(error));
        }
      })
      .catch(error => next(error));
}

  module.exports.list = (req, res, next) => {
    Trip.find()
      .then(trips => res.json(trips))
      .catch(error => next(error));
}

  
  module.exports.edit = (req, res, next) => {
  
      const id = req.params.id;
  
      Trip.findById(id)
      .then(trip => {
        if (trip) {
          Object.assign(trip, {
            name: req.body.name,
            description: req.body.description,
            gallery: req.body.gallery,
            tags: req.body.tags,
          })

          trip.save()
            .then(() => {
              res.json(trip);
            })
            .catch(error => {
              if (error instanceof mongoose.Error.ValidationError) {
                next(createError(400, error.errors));
              } else {
                next(error);
              }
            })
        } else {
          next(createError(404, `Trip with id ${id} not found`));
        }
      })
      .catch(error => next(error));
  }


  