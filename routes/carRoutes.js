const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");
const checkSellerVerification = require("../middlewares/checkSellerVerification");
const authMiddleware = require("../middlewares/authMiddleware");
const { carPhotoUploadConfig } = require("../config/multer-config");

// router.post('/upload-car-details', authMiddleware.requireLogin, carPhotoUploadConfig, carController.uploadCarData);
// router.post('/upload-car-details', authMiddleware.requireLogin, checkSellerVerification, carPhotoUploadConfig, carController.uploadCarData);
router.post(
  "/upload-car-details",
  carPhotoUploadConfig,
  carController.uploadCarData
);
router.get("/available-cars", carController.getUnsoldCars);
router.get("/car/:id", carController.getCarById);
router.get("/seller-cars/:sellerId", carController.listCarsBySeller);

router.put("/carvisit", carController.updateCarVisit);

// Route to get distinct makes
router.get("/makes", carController.getMakes);

// Route to get distinct models
router.get("/models", carController.getModels);

// Route to get distinct years
router.get("/years", carController.getYears);

// Route to get distinct colors
router.get("/colors", carController.getColors);

module.exports = router;
