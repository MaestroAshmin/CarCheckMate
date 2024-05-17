const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Route to get all pending verifications
router.get('/pending-verifications', adminController.getPendingSellerVerifications);

// Route to verify a single verification by ID
router.put('/verify-verification/:id', adminController.verifySellerVerification);

module.exports = router;