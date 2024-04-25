const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose');

// MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/carCheckMate';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check if the connection is successful
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Check for connection errors
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Sample car data
const carData = {
  carID: '1001',
  make: 'Toyota',
  model: 'Corolla',
  suburb: 'Footscray',
  color: 'White',
  price: 20000,
  odometer: 80000,
  transmission: 'Automatic',
  year: 2020,
  engineType: 'V6',
  fuelType: 'Petrol',
  bodyType: 'Sedan',
  details: 'This is a detailed description of the car.',
  features: ['Feature 1', 'Feature 2', 'Feature 3'],
  carPhotos: ['/path/to/car-image-1.jpg', '/path/to/car-image-2.jpg', '/path/to/car-image-3.jpg'],
};

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

// Serve the car data at the specified endpoint for CarInfoPage
app.get('/api/cars/:carId', (req, res) => {
  const carId = req.params.carId;
  const pageType = req.query.pageType;

  // Check if the request is coming from the CarInfoPage
  if (pageType === 'carInfoPage') {
    // Find the car data based on the carId
    // For now, we'll just send the sample carData
    res.json(carData);
  } else {
    // Handle other cases or send an error response
    res.status(404).json({ error: 'Invalid request' });
  }
});

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

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, 'build')));

// Serve the index.html file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});