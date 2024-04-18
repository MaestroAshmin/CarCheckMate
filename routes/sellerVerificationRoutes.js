const express = require('express');
const router = express.Router();
const sellerVerificationController = require('../controllers/sellerVerificationController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/seller-verification', authMiddleware.requireLogin, sellerVerificationController.verifySeller);

module.exports = router;