const express = require('express');
const app = express();
const path = require('path');

// Sample car data
const carData = {
  "carID": "1001",
  "make": "Toyota",
  "model": "Corolla",
  "suburb": "Footscray",
  "color": "White",
  "price": 20000,
  "odometer": 80000,
  "transmission": "Automatic",
  "year": 2020,
  "engineType": "V6",
  "fuelType": "Petrol",
  "bodyType": "Sedan",
  "details": "This is a detailed description of the car.",
  "features": [
    "Feature 1",
    "Feature 2",
    "Feature 3"
  ],
  "carPhotos": [
    "/path/to/car-image-1.jpg",
    "/path/to/car-image-2.jpg",
    "/path/to/car-image-3.jpg"
  ]
};

// Serve the car data at the specified endpoint
app.get('/api/cars/:carId', (req, res) => {
  const carId = req.params.carId;
  // You can add logic here to fetch the car data based on the carId
  // For now, we're just returning the sample car data
  res.json(carData);
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