const express = require('express');
const router = express.Router();
const trips = require('../controllers/trips.controller');
const Trip = require('../models/trip.model');
const authMiddleware = require('../middlewares/auth.middleware');
const uploader = require('../config/multer.config');
const uploadCloud = require('../config/cloudinary.js');

router.get('/list', trips.list);
router.post('/',
    authMiddleware.isAuthenticated,
    uploader.array('images'),
    trips.create
);
router.get('/:id', trips.detail);
router.post(
    '/:id',
    authMiddleware.isOwner(Trip),
    uploader.array('images'),
    trips.edit
);

module.exports = router;
