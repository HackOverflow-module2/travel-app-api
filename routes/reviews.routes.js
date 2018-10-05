const express = require('express');
const router = express.Router();
const reviews = require('../controllers/reviews.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post(
  '/', 
  authMiddleware.isAuthenticated,
  reviews.create
);
router.get('/list', reviews.list);

module.exports = router;
