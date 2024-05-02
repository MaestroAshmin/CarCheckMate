const express = require('express');
const router = express.Router();
const sellerVerificationController = require('../controllers/sellerVerificationController');
const authMiddleware = require('../middlewares/authMiddleware');
const { sellerUploadFieldsConfig } = require('../config/multer-config');

//router.post('/seller-verification', authMiddleware.requireLogin, sellerUploadFieldsConfig, sellerVerificationController.verifySeller);
router.post('/seller-verification',  sellerVerificationController.verifySeller);

module.exports = router;