const express = require('express');
const router = express.Router();
const inspectionController = require('../controllers/inspectionController');

// Route to create a new inspection record
router.post('/inspection-form/:carId', inspectionController.createInspection);

module.exports = router;