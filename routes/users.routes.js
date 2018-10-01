const express = require('express');
const router = express.Router();
const users = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', users.create);
router.get('/:id', authMiddleware.isAuthenticated, users.detail);

router.post(
'/:id/edit',
//insert middlewares here- authenticated, owner and photo upload
users.edit
);

module.exports = router;
