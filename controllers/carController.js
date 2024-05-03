const multer = require('multer'); // Import multer
const path = require("path");
const fs = require("fs");
const Car = require("../models/Car");
const User = require('../models/User');

// Server URL
const serverUrl = 'http://localhost:3000';

module.exports.config = {
  api: {
    bodyParser: false,
  },
};

// Function to ensure directory exists, create it if it doesn't
const ensureDirectoryExists = (directory) => {
  const directoryPath = path.resolve(directory);
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true }); // recursive option creates parent directories if they don't exist
  }
};

// Controller method to upload car data
const uploadCarData = async (req, res) => {
  
  try {
    // Extract car data from the request body
    const { seller_id, make, model, streetName, suburb, postcode, state, color, price, odometer, transmission, year, engineType, fuelType, bodyType, registrationNo } = req.body;

    const user = await User.findOne({ _id: seller_id });

    // Check if the user exists and if their sellerVerified field is false
    if (user && !user.sellerVerified) {
      return res.status(400).json({ error: "Seller is not Verified" });
    }
    // Check if carPhotos are uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "No car photos uploaded or invalid format" });
    }

    // Get the array of carPhoto objects from req.files
    let numCarPhotos = 0;
    for (const key in req.files) {
        if (key.startsWith('carPhoto')) {
            numCarPhotos++;
        }
    }
    if (numCarPhotos < 8 || numCarPhotos > 20) {
      return res.status(400).json({ error: "Number of car photos must be between 8 and 20" });
    }
    // Ensure directory exists for saving car photos
    // const uploadDirectory = path.join(__dirname, "..", "uploads", "car_photos");
    // Specify the directory where you want to serve static files (assuming it's accessible to clients)
    const publicDirectory = 'uploads/car_photos';
    ensureDirectoryExists(publicDirectory);

    // Save car photos to the upload directory and store their paths
    const carPhotoPaths = [];
    for (const key in req.files) {
        if (Object.prototype.hasOwnProperty.call(req.files, key)) {
            const photoDataArray = req.files[key]; // Array of file objects
            if (photoDataArray && Array.isArray(photoDataArray)) {
                for (let i = 0; i < photoDataArray.length; i++) {
                    const photoData = photoDataArray[i];
                    if (photoData && typeof photoData === 'object') {
                      // Generate a unique file name by adding the current date and time
                        const currentDate = new Date().toISOString().replace(/:/g, "-"); // Replace colons with hyphens to make it a valid file name
                        const fileName = `${currentDate}_${photoData.originalname}`;
                        // const fileName = `carPhoto_${key.slice(9)}_${i}.${photoData.mimetype.split('/')[1]}`;
                        const filePath = path.join(publicDirectory, fileName);
                        fs.writeFileSync(filePath, photoData.buffer); // Write binary data to file
                        // carPhotoPaths.push(filePath);
                        // Store the URL with server prefix and forward slashes
                      carPhotoPaths.push(`${serverUrl}/uploads/car_photos/${fileName}`);
                    }
                }
            }
        }
    }
    // Convert carPhotos array to a comma-separated string
    // const carPhotoPathsString = carPhotoPaths.join(',');
    // console.log(carPhotoPathsString);

    // Create title based on make, model, and year
    const title = `${year} ${make} ${model}`;

        // Create a new car instance
        const newCar = new Car({
            seller_id: seller_id,
            title,
            registrationNo,
            make,
            model,
            streetName,
            suburb,
            postcode,
            state,
            color,
            price,
            odometer,
            transmission,
            year,
            engineType,
            fuelType,
            bodyType,
            carPhotos: carPhotoPaths
        });
      
        console.log(newCar);
    // Save the car to the database
    await newCar.save();

    // Return success response
    res
      .status(200)
      .json({ success: true, message: "Car data uploaded successfully" });
  } catch (error) {
    console.error("Error uploading car data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to get all unsold cars
const getUnsoldCars = async (req, res) => {
  try {
    // Fetch unsold cars from the database
    const unsoldCars = await Car.find({ hasBeenSold: false });

    // Return the fetched unsold cars as a response
    res.status(200).json(unsoldCars);
  } catch (error) {
    console.error("Error fetching unsold cars:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCarById = async (req, res) => {
  try {
    const id = req.params.id; // Update parameter name to match the route
    const car = await Car.findById(id);
    console.log(car);
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.status(200).json(car);
  } catch (error) {
    console.error("Error fetching car details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const listCarsBySeller = async (req, res) => {
  try {
      const sellerId = req.params.sellerId;

      // Query the database for cars uploaded by the seller
      const cars = await Car.find({ seller_id: sellerId });

      res.json(cars);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
}


module.exports = { uploadCarData, getUnsoldCars, getCarById, listCarsBySeller };