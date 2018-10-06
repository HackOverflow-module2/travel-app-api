const express = require('express');
const router = express.Router();
const pois = require('../controllers/pois.controller');
const uploader = require('../config/multer.config');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/list', pois.list);

router.post(
  '/', 
  authMiddleware.isAuthenticated,
  uploader.array('images'),
  pois.create
);
router.get('/:id', pois.detail);

router.post(
  '/:id',
  authMiddleware.isAuthenticated,
  uploader.array('images'),
  //insert middlewares here- authenticated, owner and photo upload
  pois.edit
);

module.exports = router;
