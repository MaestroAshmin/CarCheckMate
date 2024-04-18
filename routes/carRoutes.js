const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const checkSellerVerification = require('../middlewares/checkSellerVerification');
const authMiddleware = require('../middlewares/authMiddleware');
// const { carPhotoUploadConfig } = require('../config/multer-config');

router.post('/upload-car-details', authMiddleware.requireLogin, checkSellerVerification, carController.uploadCarData);

module.exports = router;