
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authenticateToken');

router.post('/register', userController.register);
router.get('/verify', userController.verifyEmail);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

// router.post('/login', authenticateToken, userController.login);

module.exports = router;