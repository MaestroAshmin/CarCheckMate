const express = require('express');
const router = express.Router();
const inspectionController = require('../controllers/inspectionController');
const checkMechanicPermission = require('../middlewares/checkMechanicPermission')
const authMiddleware = require('../middlewares/authMiddleware');
const { rwcUploadConfig } = require('../config/multer-config');

router.post('/:inspectionId',authMiddleware.requireLogin, checkMechanicPermission, rwcUploadConfig, inspectionController.changeInspectionStatus);

module.exports = router;