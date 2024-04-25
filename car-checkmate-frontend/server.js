// car-checkmate-frontend/server.js
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Generate a unique filename
  },
});
const upload = multer({ storage: storage });

// Handle POST request for uploading car details
app.post('/cars/upload-car-details', upload.single('carPhotos'), (req, res) => {
  // Access the form data and the uploaded file
  const formData = req.body;
  const carPhotos = req.file;

  // Process the form data and save it to the database or perform other operations
  console.log('Form data:', formData);
  console.log('Car photos:', carPhotos);

  // Send a response
  res.json({ message: 'Car data uploaded successfully' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});