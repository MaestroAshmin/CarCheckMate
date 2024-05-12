const Inspection = require('../models/Inspection'); 
const Car = require('../models/Car'); 
const FormModel = require('../models/InspectionForm');
const fs = require('fs');
const path = require('path');

// Controller function for creating a new inspection record
async function createInspection (req,res) {
    console.log(req);
    try {
        const {buyer_id, inspectionDate, inspectionTime} = req.body;

        // Check if all required fields are provided
        if (!inspectionDate || !inspectionTime) {
            return res.status(400).json({ error: 'Please provide all required fields.' });
        }

        // Get the carId from the parameters
        const car_id = req.params.carId;

        // Fetch the car document from the database using the car ID
        const car = await Car.findById(car_id);

        // Check if the car exists
        if (!car) {
            return res.status(404).json({ error: 'Car not found.' });
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
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller for retrieving upcoming Inspection for particular seller only

async function getPendingInspectionsForSeller (req, res){
    try {
        const seller_id = req.params.id; // Get user ID from request parameters
        console.log(seller_id);
        // Get the current date
        const currentDate = new Date();

        // Find all inspections where sellerAcceptedInspectionRequest is null or false
        // and car_id's seller_id matches the sellerId obtained from the session
        const pendingInspections = await Inspection.find({ 
            $and: [
                { seller_id: seller_id },
                { sellerAcceptedInspectionRequest: null },
                { inspectionDate: { $gte: currentDate } }
            ]
        })
        .sort({ inspectionDate: 1})
        .exec();
        console.log(pendingInspections);
        // Fetch details of each car associated with the pending inspections
        const inspectionsWithCarDetails = await Promise.all(pendingInspections.map(async (inspection) => {
            let carDetails = await Car.findById(inspection.car_id);
            carDetails = carDetails.toObject();
            delete carDetails.__v; // Remove __v field
            return { ...inspection.toObject(), car: carDetails };
        }));
        res.status(200).json({ inspectionsWithCarDetails });
    } catch (error) {
        console.error('Error fetcing pending inspections:', error);
        res.status(500).json({error: 'Internal server error'});
    }
}

// Controller function to accept an inspection request
async function acceptInspection(req, res) {
    try {
        const { inspectionId } = req.params;

        // Update the inspection record to mark it as accepted by the seller
        await Inspection.findByIdAndUpdate(inspectionId, { sellerAcceptedInspectionRequest: true });

        res.status(200).json({ message: 'Inspection request accepted successfully.' });
    } catch (error) {
        console.error('Error accepting inspection request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to deny an inspection request
async function denyInspection (req, res) {
    try {
        const { inspectionId } = req.params;
        const { inspectionMessage } = req.body; // Extract inspectionMessage from request body

        // Update the inspection record to mark it as denied by the seller and include inspectionMessage
        await Inspection.findByIdAndUpdate(inspectionId, { 
            sellerAcceptedInspectionRequest: false,
            inspectionMessage: inspectionMessage // Set inspectionMessage
        });

        res.status(200).json({ message: 'Inspection request denied successfully.' });
    } catch (error) {
        console.error('Error denying inspection request:', error);
        res.status(500).json({ error: error.message });
    }
};

// Controller function to get upcoming inspections for a buyer
async function getUpcomingInspectionsBuyer(req, res) {
    try {
        const buyerId = req.params.id; // Get user ID from request parameters
        // Get current date and time in UTC timezone
        const currentDate = new Date().toISOString();

         // Get upcoming inspections for the buyer
         const upcomingInspections = await Inspection.find({ 
             buyer_id: buyerId, 
             inspectionDate: { $gte: currentDate } // Filter inspections with inspectionDate greater than or equal to current date
         }).sort({ inspectionDate: 1}).exec();
 
         const inspectionsWithCarDetails = await Promise.all(upcomingInspections.map(async (inspection) => {
             let carDetails = await Car.findById(inspection.car_id);
             if (!carDetails) {
                // If car details are empty, return an object with a message
                return { ...inspection.toObject()};
            }
             carDetails = carDetails.toObject();
             delete carDetails.__v; // Remove __v field
             return { ...inspection.toObject(), car: carDetails };
         }));
         res.status(200).json({ inspectionsWithCarDetails });
     } catch (error) {
         console.error('Error fetching upcoming inspections:', error);
         res.status(500).json({ error: 'Internal server error' });
     }
};

// Controller function to get past inspections for a buyer
async function getPastInspectionsBuyer (req, res) {
    try {
        const buyerId = req.params.id; // Get user ID from request parameters
        // Get current date and time in UTC timezone

        // Get past inspections for the buyer
        const pastInspections = await Inspection.find({ buyer_id: buyerId, inspectionDate: { $lt: new Date() } }).sort({ inspectionDate: 1}).exec();
        const inspectionsWithCarDetails = await Promise.all(pastInspections.map(async (inspection) => {
            let carDetails = await Car.findById(inspection.car_id);
            if (!carDetails) {
                // If car details are empty, return an object with a message
                return { ...inspection.toObject()};
            }
            carDetails = carDetails.toObject();
            delete carDetails.__v; // Remove __v field
            return { ...inspection.toObject(), car: carDetails };
        }));
        res.status(200).json({ inspectionsWithCarDetails });
        // res.status(200).json({ pastInspections });
    } catch (error) {
        console.error('Error fetching past inspections:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to get upcoming inspections for a Seller
async function getUpcomingInspectionsSeller(req, res) {
    try {
        const sellerId = req.params.id; // Get user ID from request parameter

        const upcomingInspections = await Inspection.find({
            seller_id: sellerId,
            inspectionDate: { $gte: new Date() },
            $or: [
                { sellerAcceptedInspectionRequest: true }
            ]
        }).sort({ inspectionDate: 1 }).exec();
        const inspectionsWithCarDetails = await Promise.all(upcomingInspections.map(async (inspection) => {
            let carDetails = await Car.findById(inspection.car_id);
            carDetails = carDetails.toObject();
            delete carDetails.__v; // Remove __v field
            return { ...inspection.toObject(), car: carDetails };
        }));
        res.status(200).json({ inspectionsWithCarDetails });
    } catch (error) {
        console.error('Error fetching upcoming inspections:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to get past inspections for a Seller
async function getPastInspectionsSeller (req, res) {
    try {
        const sellerId = req.params.seller_id;

        const pastInspections = await Inspection.find({ seller_id: sellerId, inspectionDate: { $lt: new Date() } }).sort({ inspectionDate: 1}).exec();
        const inspectionsWithCarDetails = await Promise.all(pastInspections.map(async (inspection) => {
            let carDetails = await Car.findById(inspection.car_id);
            carDetails = carDetails.toObject();
            delete carDetails.__v; // Remove __v field
            return { ...inspection.toObject(), car: carDetails };
        }));
        res.status(200).json({ inspectionsWithCarDetails });

    } catch (error) {
        console.error('Error fetching past inspections:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to get upcoming unclaimed inspections for mechanic
async function getUpcomingUnclaimedInspectionsForMechanic (req, res) {
    try {
        // Get upcoming inspections that have not been selected by other mechanics yet
        const upcomingInspections = await Inspection.find({ mechanic_id: null, inspectionDate: { $gte: new Date() } });
        // Fetch car details for each inspection
        
        const inspectionsWithCarDetails = await Promise.all(upcomingInspections.map(async (inspection) => {
            let carDetails = await Car.findById(inspection.car_id);
            carDetails = carDetails.toObject();
            delete carDetails.__v; // Remove __v field
            return { ...inspection.toObject(), car: carDetails };
        }));
        console.log(inspectionsWithCarDetails);
        res.status(200).json({ inspectionsWithCarDetails });
    } catch (error) {
        console.error('Error fetching upcoming inspections for mechanic:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to accept an inspection for Mechanic
async function acceptInspectionMechanic (req, res) {
    try {
        const { inspectionId } = req.params;
        const { mechanicId } = req.body;
        // const mechanicId = req.session.user._id;

         // Get the inspection details
         const inspection = await Inspection.findById(inspectionId);

        // Check if the mechanic has more than one inspection at the same time and date
        const existingInspections = await Inspection.find({
            mechanic_id: mechanicId,
            inspectionDate: inspection.inspectionDate, // Match inspection date
            inspectionTime: inspection.inspectionTime // Match inspection time
        });

        if (existingInspections.length > 0) {
            // Mechanic has another inspection at the same time and date, cannot accept this one
            return res.status(400).json({ error: 'Cannot accept inspection. Scheduling conflict.' });
        }

        // Update the inspection record to mark it as accepted by the mechanic
        await Inspection.findByIdAndUpdate(inspectionId, { mechanic_id: mechanicId });

        res.status(200).json({ message: 'Inspection accepted successfully.' });
    } catch (error) {
        console.error('Error accepting inspection:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to get sorted inspections for a mechanic
async function getAcceptedInspectionsMechanic (req, res) {
    try {
        const mechanicId = req.params.mechanicId;
        // Get current date
        const currentDate = new Date();
        // Get inspections accepted by the mechanic and sort them by date and time
        const sortedInspections = await Inspection.find({ mechanic_id: mechanicId, inspectionDate: { $gte: currentDate } })
            .sort({ inspectionDate: 1, inspectionTime: 1 });

        // Map the inspections with car details
        // Fetch car details for each inspection
        const inspectionsWithCarDetails = await Promise.all(sortedInspections.map(async (inspection) => {
            let carDetails = await Car.findById(inspection.car_id);
            carDetails = carDetails.toObject();
            delete carDetails.__v; // Remove __v field
            return { ...inspection.toObject(), car: carDetails };
        }));
        res.status(200).json({ inspectionsWithCarDetails });
    } catch (error) {
        console.error('Error fetching sorted inspections:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Middleware to validate file type
function validateFileType(file) {
    // Check if the file type is either PDF or image
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif'];
    return allowedTypes.includes(file[0].mimetype);
}

// Controller function to upload RWC checks and update inspection status
async function changeInspectionStatus(req, res) {
    try {
        const { inspectionId } = req.params;
        const { status } = req.body; // Indicates whether the inspection passed (true) or failed (false)
        const rwcCheckFile = req.files['rwcCheck']; // Uploaded RWC check file
        const userId = req.session.user._id; // Get logged-in user's ID


        // Find the inspection by ID
        const inspection = await Inspection.findById(inspectionId);

        // Check if the inspection exists
        if (!inspection) {
            return res.status(404).json({ error: 'Inspection not found.' });
        }

        // Check if the logged-in user has the same mechanic ID as the inspection
        if (inspection.mechanic_id.toString() !== userId) {
            return res.status(403).json({ error: 'You are not authorized to update this inspection.' });
        }

        // Update the inspection status
        inspection.inspectionStatus = status;

        // If RWC check file is provided, upload it
        if (rwcCheckFile) {
            console.log(rwcCheckFile);
            // Validate file type
            if (!validateFileType(rwcCheckFile)) {
                return res.status(400).json({ error: 'Invalid file type. Only PDF or image files are allowed.' });
            }

            // Save the file path to the RWC checks field
            const filePath = path.join(__dirname, '../uploads/', rwcCheckFile[0].originalname);
            fs.writeFileSync(filePath, rwcCheckFile[0].buffer);
            inspection.rwcChecks = filePath; // Assign the file path directly as a string
        } else {
            // If no file is provided, set rwcChecks to an empty string
            inspection.rwcChecks = ''; // or null
        }

        await inspection.save();

        res.status(200).json({ message: 'RWC check uploaded and inspection status updated successfully.' });
    } catch (error) {
        console.error('Error uploading RWC check and updating inspection status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function saveForm(req, res) {
    try {
        const formData = req.body;
        const newForm = new FormModel(formData);
        const savedForm = await newForm.save();
        res.status(200).json(savedForm);
    } catch (error) {
        console.error('Error saving form:', error);
        res.status(500).json({ error: 'Error saving form' });
    }
}

async function getAllForms(req, res) {
    try {
        const allForms = await FormModel.find().populate('carId');
        res.status(200).json(allForms);
    } catch (error) {
        console.error('Error getting all forms:', error);
        res.status(500).json({ error: 'Error getting all forms' });
    }
}



module.exports = {getAllForms, saveForm, createInspection, getPendingInspectionsForSeller, acceptInspection, denyInspection, getUpcomingInspectionsBuyer, getPastInspectionsBuyer, getPastInspectionsSeller, getUpcomingInspectionsSeller, getUpcomingUnclaimedInspectionsForMechanic, acceptInspectionMechanic, getAcceptedInspectionsMechanic, changeInspectionStatus }