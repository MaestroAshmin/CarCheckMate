const Inspection = require('../models/Inspection'); 
const Car = require('../models/Car'); 

// Controller function for creating a new inspection record
async function createInspection (req,res) {
    console.log(req);
    try {
        const { inspectionDate, inspectionTime} = req.body;
        // Get buyer id from session
        const buyer_id = req.session.user._id;

        // Check if all required fields are provided
        if (!inspectionDate || !inspectionTime) {
            return res.status(400).json({ message: 'Please provide all required fields.' });
        }

        // Get the carId from the parameters
        const car_id = req.params.carId;

        // Fetch the car document from the database using the car ID
        const car = await Car.findById(car_id);

        // Check if the car exists
        if (!car) {
            return res.status(404).json({ message: 'Car not found.' });
        }

        // Extract the seller ID from the car document
        const seller_id = car.seller_id;

        // Create a new inspection record
        const inspection = new Inspection({
            inspectionDate,
            inspectionTime,
            seller_id,
            buyer_id,
            car_id
        });

        // Save the inspection record to the database
        await inspection.save();

        res.status(201).json({ message: 'Inspection record created successfully.', inspection });
    } catch (error) {
        console.error('Error creating inspection:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { createInspection }