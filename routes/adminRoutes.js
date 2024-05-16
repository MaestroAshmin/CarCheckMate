const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Route to get all pending verifications
router.get('/pending-verifications', adminController.getPendingSellerVerifications);

// Route to verify a single verification by ID
router.put('/verify-verification/:id', adminController.verifySellerVerification);

// Route to get all mechanic verifications
router.get('/pending-mechanic-verifications', adminController.getPendingMechanicVerifications);

//Route to get all inspection details with car, user and their verification details
router.get('/get-inspections', adminController.getAllInspectionDetails)

module.exports = router;