const express = require('express');
const router = express.Router();
const sellerVerificationController = require('../controllers/sellerVerificationController');
const authMiddleware = require('../middlewares/authMiddleware');
// const multerMiddleware= require('../middlewares/multerMiddleware');
// const multerMiddleware = require('../middlewares/gridFSMiddleware');

// router.post('/seller-verification', authMiddleware.requireLogin, uploadMiddleware.fields([{ name: 'frontImage', maxCount: 1 }, { name: 'backImage', maxCount: 1 }]), sellerVerificationController.handleLicenseUpload, sellerVerificationController.verifySeller);
// router.post('/seller-verification', authMiddleware.requireLogin, multerMiddleware.uploadFiles, gridFSMiddleware.uploadFiles, sellerVerificationController.verifySeller);
router.post('/seller-verification', authMiddleware.requireLogin, sellerVerificationController.verifySeller);
// router.post('/uploads', multerMiddleware.upload.fields([{ name: 'frontImage', maxCount: 1 }, { name: 'backImage', maxCount: 1 }]), (req, res) => {
//     console.log(req.body);
//     console.log(req.files);
// });
module.exports = router;