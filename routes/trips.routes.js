const express = require('express');
const router = express.Router();
const trips = require('../controllers/trips.controller');
const uploader = require('../config/multer.config');

router.get('/list', trips.list);
router.post('/',
    uploader.array('images'),
    trips.create);
router.get('/:id', trips.detail);
router.post(
'/:id',
//insert middlewares here- authenticated, owner and photo upload
uploader.array('images'),
trips.edit
);

module.exports = router;
