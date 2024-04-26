const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const checkSellerVerification = require('../middlewares/checkSellerVerification');
const authMiddleware = require('../middlewares/authMiddleware');
const { carPhotoUploadConfig } = require('../config/multer-config');

// router.post('/upload-car-details', authMiddleware.requireLogin, checkSellerVerification, carPhotoUploadConfig, carController.uploadCarData);
router.post('/upload-car-details',carPhotoUploadConfig, carController.uploadCarData);
router.get('/available-cars', carController.getUnsoldCars);
router.get('/:carId', carController.getCarById);

module.exports = router;