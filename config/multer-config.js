const multer = require("multer");

// Multer setup
const upload = multer();
// Multer configuration for handling seller verification image uploads
const sellerUploadFieldsConfig = upload.fields([
  { name: "frontImage", maxCount: 1 },
  { name: "backImage", maxCount: 1 },
]);

// Define the maximum number of images
const maxNumberOfImages = 20;

// Generate the fields array for Multer configuration
const fieldsArray = [];
for (let i = 0; i < maxNumberOfImages; i++) {
  fieldsArray.push({ name: `carPhoto[${i}]`, maxCount: 1 });
}

// Multer configuration for handling car image uploads
const carPhotoUploadConfig = upload.fields(fieldsArray);

// Multer configuration for handling rwc uploads

const rwcUploadConfig = upload.fields([{ name: "rwcCheck", maxCount: 1 }]);

module.exports = {
  sellerUploadFieldsConfig,
  carPhotoUploadConfig,
  rwcUploadConfig,
};
