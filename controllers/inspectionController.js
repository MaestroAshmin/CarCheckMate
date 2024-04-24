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
        // Get Seller id from user session
        const seller_id = req.session.user._id;

        // Get the current date
        const currentDate = new Date();

        // Find all inspections where sellerAcceptedInspectionRequest is null or false
        // and car_id's seller_id matches the sellerId obtained from the session
        const pendingInspections = await Inspection.find({ 
            $and: [
                { seller_id: seller_id },
                { $or: [
                    { sellerAcceptedInspectionRequest: false },
                    { sellerAcceptedInspectionRequest: null }
                ]},
                { inspectionDate: { $gte: currentDate } }
            ]
        })
        .sort({ inspectionDate: 1})
        .exec();
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

        // Update the inspection record to mark it as denied by the seller
        await Inspection.findByIdAndUpdate(inspectionId, { sellerAcceptedInspectionRequest: false });

        res.status(200).json({ message: 'Inspection request denied successfully.' });
    } catch (error) {
        console.error('Error denying inspection request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to get upcoming inspections for a buyer
async function getUpcomingInspectionsBuyer(req, res) {
    try {
        const buyerId = req.session.user._id; 

        // Get upcoming inspections for the buyer
        const upcomingInspections = await Inspection.find({ buyer_id: buyerId, inspectionDate: { $gte: new Date() } }).sort({ inspectionDate: 1}).exec();
        const inspectionsWithCarDetails = await Promise.all(upcomingInspections.map(async (inspection) => {
            let carDetails = await Car.findById(inspection.car_id);
            carDetails = carDetails.toObject();
            delete carDetails.__v; // Remove __v field
            return { ...inspection.toObject(), car: carDetails };
        }));
        res.status(200).json({ inspectionsWithCarDetails });
        // res.status(200).json({ upcomingInspections });
    } catch (error) {
        console.error('Error fetching upcoming inspections:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to get past inspections for a buyer
async function getPastInspectionsBuyer (req, res) {
    try {
        const buyerId = req.session.user._id;

        // Get past inspections for the buyer
        const pastInspections = await Inspection.find({ buyer_id: buyerId, inspectionDate: { $lt: new Date() } }).sort({ inspectionDate: 1}).exec();
        const inspectionsWithCarDetails = await Promise.all(pastInspections.map(async (inspection) => {
            let carDetails = await Car.findById(inspection.car_id);
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
        const sellerId = req.session.user._id; 

        const upcomingInspections = await Inspection.find({ seller_id: sellerId, inspectionDate: { $gte: new Date() } }).sort({ inspectionDate: 1}).exec();
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
        const sellerId = req.session.user._id;

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
        const mechanicId = req.session.user._id; 
        // Get upcoming inspections that have not been selected by other mechanics yet
        const upcomingInspections = await Inspection.find({ mechanic_id: null, inspectionDate: { $gte: new Date() } });
        // Fetch car details for each inspection
        const inspectionsWithCarDetails = await Promise.all(upcomingInspections.map(async (inspection) => {
            let carDetails = await Car.findById(inspection.car_id);
            carDetails = carDetails.toObject();
            delete carDetails.__v; // Remove __v field
            return { ...inspection.toObject(), car: carDetails };
        }));

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
        const mechanicId = req.session.user._id;

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
        const mechanicId = req.session.user._id;
        // Get current date
        const currentDate = new Date();
        // Get inspections accepted by the mechanic and sort them by date and time
        const sortedInspections = await Inspection.find({ mechanic_id: mechanicId, inspectionDate: { $gte: currentDate } })
            .sort({ inspectionDate: 1, inspectionTime: 1 })
            .populate('car_id') // Populate car details
            .exec();

        // Map the inspections with car details
        const inspectionsWithCarDetails = sortedInspections.map(inspection => {
            const carDetails = inspection.car_id.toObject();
            delete carDetails.__v; // Remove __v field
            return { ...inspection.toObject(), car: carDetails };
        });
        res.status(200).json({ inspectionsWithCarDetails });
    } catch (error) {
        console.error('Error fetching sorted inspections:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
module.exports = { createInspection, getPendingInspectionsForSeller, acceptInspection, denyInspection, getUpcomingInspectionsBuyer, getPastInspectionsBuyer, getPastInspectionsSeller, getUpcomingInspectionsSeller, getUpcomingUnclaimedInspectionsForMechanic, acceptInspectionMechanic, getAcceptedInspectionsMechanic }