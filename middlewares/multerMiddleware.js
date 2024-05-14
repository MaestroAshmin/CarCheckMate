const multer = require("multer");
// const { GridFsStorage } = require('multer-gridfs-storage');
const crypto = require("crypto");

// Create GridFS storage engine
// const storage = new GridFsStorage({
//     url: 'mongodb://localhost:27017/car_check_mate', // Your MongoDB connection string
//     options: { useNewUrlParser: true, useUnifiedTopology: true },
//     file: (req, file) => {
//         console.log(file[0]);
//         // Check if file buffer exists before creating a hash
//         if (file.buffer) {
//             console.log('File buffer length:', file.buffer.length);
//         } else {
//             console.log('File buffer is undefined');
//         }
//         const bufferExists = file.buffer && Buffer.isBuffer(file.buffer);
//         const hash = bufferExists ? crypto.createHash('md5').update(file.buffer).digest('hex') : '';
//         return {
//             filename: file.originalname, // You can customize the filename as needed
//             bucketName: 'uploads', // Bucket name in MongoDB GridFS
//             fileId: hash // Use the hash as the file ID
//         };
//     }
// });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const storageMV = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads/mechanicData");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadMV = multer({ storage: storageMV });
// const upload = multer({
//     storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype.startsWith('image/')) {
//             cb(null, true);
//         } else {
//             cb(new Error('Only images are allowed'));
//         }
//     }
// }).fields([{ name: 'frontImage', maxCount: 1 }, { name: 'backImage', maxCount: 1 }]);

module.exports = { upload, uploadMV };
