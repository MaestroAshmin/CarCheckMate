// const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Car = require('../models/Car');
// const { carPhotoUploadConfig } = require('../config/multer-config');

// Multer configuration for car photos
// const carPhotoUpload = multer({
//     storage: multer.memoryStorage(),
//     limits: { files: 20 } // Adjust maximum number of files allowed
// }).array('carPhotos', 20);

// Function to save car photos
// const saveCarPhotos = (files, folder) => {
//     return files.map(file => {
//         // Example: Save photo to file system
//         const filePath = path.join(__dirname, '..', 'uploads', folder, file.originalname);
//         fs.writeFileSync(filePath, file.buffer);
//         return filePath;
//     });
// };

// Controller method to upload car data
const uploadCarData = async (req, res) => {
    console.log(req);
    try {
        // Upload car photos
        // carPhotoUploadConfig(req, res, async (err) => {
        //     if (err) {
        //         return res.status(400).json({ error: 'Error uploading car photos' });
        //     }

        //     // Check if the required number of photos is uploaded
        //     const uploadedPhotos = req.files || [];
        //     if (uploadedPhotos.length < 8 || uploadedPhotos.length > 20) {
        //         return res.status(400).json({ error: 'Please upload between 8 to 20 car photos' });
        //     }

        //     // Save car photos to a separate folder
        //     const carPhotos = saveCarPhotos(uploadedPhotos, 'car_photos');

            // Extract other car data from the request body
            console.log(req.body);
            const { make, model, location, color, price, odometer, transmission, year, engineType, fuelType, bodyType} = req.body;

            // Create title based on make, model, and year
            const title = `${year} ${make} ${model}`;

            // get userId from session
            const userId = req.session.user._id;
            // Create a new car instance
            const newCar = new Car({
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
                // carPhotos: carPhotos,
            });

            // Save the car to the database
            await newCar.save();

            // Return success response
            res.status(200).json({ success: true, message: 'Car data uploaded successfully' });
        // });
    } catch (error) {
        console.error('Error uploading car data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { uploadCarData };