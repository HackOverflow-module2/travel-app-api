const express = require('express');
const router = express.Router();
const users = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const uploader = require('../config/multer.config');

router.post('/',
  uploader.single('image'),
  users.create
);
router.get('/:id', authMiddleware.isAuthenticated, users.detail);

router.post(
'/:id',
//insert middlewares here- authenticated, owner and photo upload
users.edit
);

module.exports = router;
