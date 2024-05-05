const express = require('express');
const router = express.Router();
const inspectionController = require('../controllers/inspectionController');
const checkBuyerPermission = require('../middlewares/checkBuyerPermission');
const checkSellerPermission = require('../middlewares/checkSellerPermission');
const checkMechanicPermission = require('../middlewares/checkMechanicPermission')
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/inspection-form/:carId', inspectionController.createInspection);
router.get('/pending-inspections/:id',inspectionController.getPendingInspectionsForSeller);

// Route to allow seller to accept an inspection request
router.post('/accept/:inspectionId', inspectionController.acceptInspection);

// Route to allow seller to deny an inspection request
router.post('/deny/:inspectionId',authMiddleware.requireLogin, checkSellerPermission, inspectionController.denyInspection);

// Route to allow buyer to view upcoming inspections
router.get('/upcoming-buyer/:id', inspectionController.getUpcomingInspectionsBuyer);

// Route to allow buyer to view past inspections
router.get('/past-buyer/:id', inspectionController.getPastInspectionsBuyer);

// Route to allow seller to view upcoming inspections
router.get('/upcoming-seller/:id', inspectionController.getUpcomingInspectionsSeller);

// Route to allow seller to view past inspections
//router.get('/past-seller', authMiddleware.requireLogin, checkSellerPermission, inspectionController.getPastInspectionsSeller);
router.get('/past-seller/:seller_id', inspectionController.getPastInspectionsSeller);

// Route to allow mechanics to view upcoming unclaimed inspections
router.get('/upcoming-unclaimed-mechanic', inspectionController.getUpcomingUnclaimedInspectionsForMechanic);

// Route to allow mechanics to accept an inspection
router.post('/accept-inspection-mechanic/:inspectionId', inspectionController.acceptInspectionMechanic);

// Route to allow mechanics to view sorted inspections
router.get('/inspections-accepted-mechanic',authMiddleware.requireLogin, checkMechanicPermission, inspectionController.getAcceptedInspectionsMechanic);

module.exports = router;