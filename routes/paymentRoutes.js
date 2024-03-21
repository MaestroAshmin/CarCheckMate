const express = require('express');
const router = express.Router();
const paypalPaymentController = require('../controllers/paypalPaymentController');

router.post('/create', paypalPaymentController.createPayment);
router.post('/execute', paypalPaymentController.executePayment);

module.exports = router;