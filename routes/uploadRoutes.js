const express = require('express');
const router = express.Router();
const { handleFileUpload } = require('../controllers/uploadController');
const { uploadFiles } = require('../middlewares/gridFSMiddleware')

router.post('/upload', uploadFiles, handleFileUpload);

module.exports = router;