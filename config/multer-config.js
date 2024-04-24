const multer = require('multer');

// Multer setup
const upload = multer();
// Multer configuration for handling seller verification image uploads
const sellerUploadFieldsConfig = upload.fields([{ name: 'frontImage', maxCount: 1 }, { name: 'backImage', maxCount: 1 }]);

// Multer configuration for handling car image uploads
const carPhotoUploadConfig = upload.fields([{ name: 'carPhotos', maxCount: 20 }]);

// Multer configuration for handling rwc uploads

const rwcUploadConfig = upload.fields([{ name: 'rwcCheck', maxCount: 1 }]);

module.exports = {sellerUploadFieldsConfig, carPhotoUploadConfig, rwcUploadConfig};