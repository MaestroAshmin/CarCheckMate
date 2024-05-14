
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authenticateToken');

router.post('/register', userController.register);
router.get('/verify', userController.verifyEmail);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/forgotpassword', userController.forgotPassword);
router.post('/updateuserpassword', userController.updateUserPassword);
router.post('/availability/:userId', userController.saveAvailability);
router.get('/get-availability/:userId', userController.getAvailability);

module.exports = router;