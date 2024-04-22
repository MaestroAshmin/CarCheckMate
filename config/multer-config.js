const multer = require('multer');

// Multer setup
const upload = multer();
// Multer configuration for handling seller verification image uploads
const sellerUploadFieldsConfig = upload.fields([{ name: 'frontImage', maxCount: 1 }, { name: 'backImage', maxCount: 1 }]);

// Multer configuration for handling car image uploads
// const carPhotoUploadConfig = multer({
//     storage: multer.memoryStorage(),
//     limits: { files: 20 }
// }).array('carPhotos', 20);

// console.log("carPhotoUploadConfig:", carPhotoUploadConfig);
// Multer configuration for handling car image uploads
const carPhotoUploadConfig = upload.fields([{ name: 'carPhotos', maxCount: 20 }]);

module.exports = {sellerUploadFieldsConfig, carPhotoUploadConfig};