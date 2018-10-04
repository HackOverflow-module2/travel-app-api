const express = require('express');
const router = express.Router();
const trips = require('../controllers/trips.controller');

router.post('/', trips.create);
router.get('/:id', trips.detail);
router.get('/list', trips.list);

// router.post(
// '/:id',
// //insert middlewares here- authenticated, owner and photo upload
// trips.edit
// );

module.exports = router;
