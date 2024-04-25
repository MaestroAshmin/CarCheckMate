// car-checkmate-frontend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');

// MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/carCheckMate';

// Enable CORS
app.use(cors());

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

// Define a Mongoose schema for cars
const carSchema = new mongoose.Schema({
  carID: String,
  make: String,
  model: String,
  suburb: String,
  color: String,
  price: Number,
  odometer: Number,
  transmission: String,
  year: Number,
  engineType: String,
  fuelType: String,
  bodyType: String,
  carPhotos: [String],
});

const Car = mongoose.model('Car', carSchema);

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
app.get('/api/cars/:carId', async (req, res) => {
  const carId = req.params.carId;
  try {
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    console.error('Error fetching car data:', error);
    res.status(500).json({ error: 'Internal server error' });
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
