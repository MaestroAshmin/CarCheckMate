// const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Car = require('../models/Car');

module.exports.config = {
    api: {
      bodyParser: false
    }
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
        // get userId from session
        const userId = req.session.user._id;

        // Check if carPhotos are uploaded
        if (!req.files || !req.files.carPhotos || !Array.isArray(req.files.carPhotos)) {
            return res.status(400).json({ error: 'No car photos uploaded or invalid format' });
        }
        // Retrieve the array of car photos from req.files
        const uploadedPhotos = req.files.carPhotos;
        
        // const uploadedPhotos = req.files || [];
        if (uploadedPhotos.length < 8 || uploadedPhotos.length > 20) {
            return res.status(400).json({ error: 'Please upload between 8 to 20 car photos' });
        }

        // Ensure directory exists for saving car photos
        const uploadDirectory = path.join(__dirname, '..', 'uploads', 'car_photos');
        ensureDirectoryExists(uploadDirectory);

        // Save car photos to a separate folder
        const carPhotos = uploadedPhotos.map(photo => {
            // Generate a unique file name by adding the current date and time
            const currentDate = new Date().toISOString().replace(/:/g, '-'); // Replace colons with hyphens to make it a valid file name
            const fileName = `${currentDate}_${photo.originalname}`;
            // Save photo to file system
            const filePath = path.join(uploadDirectory, fileName);
            fs.writeFileSync(filePath, photo.buffer);
            return filePath; // Return the file path or any other necessary data
        });

        // Convert carPhotos array to a comma-separated string
        const carPhotosString = carPhotos.join(',');
        // Extract other car data from the request body
        const { make, model, location, color, price, odometer, transmission, year, engineType, fuelType, bodyType } = req.body;

        // Create title based on make, model, and year
        const title = `${year} ${make} ${model}`;

        // Create a new car instance
        const newCar = new Car({
            seller_id: userId,
            title,
            make,
            model,
            location,
            color,
            price,
            odometer,
            transmission,
            year,
            engineType,
            fuelType,
            bodyType,
            carPhotos: carPhotosString, // Save file path as a comma separated string
        });

        // Save the car to the database
        await newCar.save();

        // Return success response
        res.status(200).json({ success: true, message: 'Car data uploaded successfully' });
    } catch (error) {
        console.error('Error uploading car data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
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
        console.error('Error fetching unsold cars:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getCarById = async (req, res) => {
    try {
        const carId = req.params.carId;
        // Retrieve the car details from the database based on the carId
        const car = await Car.findById(carId);
        
        // Check if the car exists
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }
        
        // If the car exists, send its details in the response
        res.status(200).json(car);
    } catch (error) {
        console.error('Error fetching car details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports = { uploadCarData, getUnsoldCars, getCarById };