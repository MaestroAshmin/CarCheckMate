const express = require('express');
const router = express.Router();
const inspectionController = require('../controllers/inspectionController');
const checkBuyerPermission = require('../middlewares/checkBuyerPermission');
const checkSellerPermission = require('../middlewares/checkSellerPermission');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/inspection-form/:carId',authMiddleware.requireLogin, checkBuyerPermission, inspectionController.createInspection);
router.get('/pending-inspections', authMiddleware.requireLogin, checkSellerPermission, inspectionController.getPendingInspectionsForSeller);

// Route to allow seller to accept an inspection request
router.post('/accept/:inspectionId',authMiddleware.requireLogin, checkSellerPermission, inspectionController.acceptInspection);

// Route to allow seller to deny an inspection request
router.post('/deny/:inspectionId',authMiddleware.requireLogin, checkSellerPermission, inspectionController.denyInspection);

// Route to allow buyer to view upcoming inspections
router.get('/upcoming-buyer', authMiddleware.requireLogin, checkBuyerPermission, inspectionController.getUpcomingInspectionsBuyer);

// Route to allow buyer to view past inspections
router.get('/past-buyer', authMiddleware.requireLogin, checkBuyerPermission, inspectionController.getPastInspectionsBuyer);

// Route to allow seller to view upcoming inspections
router.get('/upcoming-seller', authMiddleware.requireLogin, checkSellerPermission, inspectionController.getUpcomingInspectionsSeller);

// Route to allow seller to view past inspections
router.get('/past-seller', authMiddleware.requireLogin, checkSellerPermission, inspectionController.getPastInspectionsSeller);

module.exports = router;