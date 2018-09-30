var express = require('express');
var router = express.Router();
const users = require('../controllers/users.controller');

/* GET users listing. */
router.post('/', users.create);

module.exports = router;
