var express = require('express');
var router = express.Router();
const users = require('../controllers/users.controller');

router.post('/', users.create);
router.get('/:id', users.detail);

router.post(
  '/:id/edit', 
  //insert middlewares here- authenticated, owner and photo upload
  users.edit
);

module.exports = router;
