const SellerVerification = require('../models/SellerVerification');
const fs = require('fs');
const path = require('path');
const serverUrl = 'http://localhost:3000';

// Function to ensure directory exists, create it if it doesn't
const ensureDirectoryExists = (directory) => {
    const directoryPath = path.resolve(directory);
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true }); // recursive option creates parent directories if they don't exist
    }
};

async function verifySeller(req, res) {
    try {
        
        // Check if all required fields are provided
        console.log(req);
        const requiredFields = ['driverLicenseNumber', 'state', 'licenseExpiry', 'cardNumber'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ error: `${field} is required` });
            }
        }
       
        // get userId from session
        //const userId = req.session.user._id;
        const userId = req.body.seller_id;
        // Check if front and back images are provided
        console.log(req.files);
        if (!req.files || !req.files['frontImage'] || !req.files['backImage']) {
           return res.status(400).json({ error: 'Front and back images are required' });
        }
  
        const {driverLicenseNumber, state, licenseExpiry, cardNumber } = req.body;
        
        // Check if the verification has already been done by admin
        const existingVerification = await SellerVerification.findOne({ user: userId });
        if (existingVerification && existingVerification.verifiedByAdmin) {
            // If verification has been approved by admin, disallow updating
            return res.status(400).json({ error: 'Verification already approved by admin, update not allowed' });
        }

        // Extract front and back images from req.files
        const frontImage = req.files['frontImage'][0];
        const backImage = req.files['backImage'][0];
        let frontImagePath = '';
        let backImagePath = '';

        const publicDirectory = 'uploads/license_photos';
        ensureDirectoryExists(publicDirectory);

        // Processing front image
        if (req.files['frontImage'] && req.files['frontImage'][0] && typeof req.files['frontImage'][0] === 'object') {
            const frontImageData = req.files['frontImage'][0];
            const currentDate = new Date().toISOString().replace(/:/g, "-");
            const fileName = `${currentDate}_front_${frontImageData.originalname}`;
            const filePath = path.join(publicDirectory, fileName);
            fs.writeFileSync(filePath, frontImageData.buffer);
            frontImagePath = `${serverUrl}/uploads/license_photos/${fileName}`;
        }

        // Processing back image
        if (req.files['backImage'] && req.files['backImage'][0] && typeof req.files['backImage'][0] === 'object') {
            const backImageData = req.files['backImage'][0];
            const currentDate = new Date().toISOString().replace(/:/g, "-");
            const fileName = `${currentDate}_back_${backImageData.originalname}`;
            const filePath = path.join(publicDirectory, fileName);
            fs.writeFileSync(filePath, backImageData.buffer);
            backImagePath = `${serverUrl}/uploads/license_photos/${fileName}`;
        }
        console.log(frontImagePath, backImagePath);
        // Removing the prefix from the file paths
        // const relativeFrontImagePath = frontImagePath.replace('D:\\CarCheckMate\\', '');
        // const relativeBackImagePath = backImagePath.replace('D:\\CarCheckMate\\', '');
        // // Write image buffers to files
        // fs.writeFileSync(relativeFrontImagePath, frontImage.buffer);
        // fs.writeFileSync(relativeBackImagePath, backImage.buffer);
        if (existingVerification) {
            // Update the existing verification record
            existingVerification.driverLicenseNumber = driverLicenseNumber;
            existingVerification.state = state;
            existingVerification.licenseExpiry = licenseExpiry;
            existingVerification.cardNumber = cardNumber;
            existingVerification.frontImage = frontImage;
            existingVerification.backImage = backImage;
            await existingVerification.save();
            return res.status(200).json({ status: true, message: 'Seller verification details updated successfully' });
        }
        // New Verification
        const verificationData = new SellerVerification({
            user: userId,
            driverLicenseNumber,
            state,
            licenseExpiry,
            cardNumber,
            frontImage: frontImagePath, // Save file path to database
            backImage: backImagePath // Save file path to database
        });
        await verificationData.save();

        res.status(200).json({ status: true, message: 'Seller verification details saved successfully' });
    } catch (error) {
        console.error('Error saving seller verification details:', error);
        res.status(500).json({ status: false, error: 'Internal Server Error' });
    }
}

async function getSellerVerificationData (req, res){
    try {
        const sellerId = req.params.id;
        console.log(sellerId);
        // Query the database for seller verification details by seller ID
        const verificationDetails = await SellerVerification.findOne({ user: sellerId });

        if (!verificationDetails) {
            return res.status(404).json({ error: 'Seller verification details not found' });
        }

        res.json(verificationDetails);
    } catch (error) {
        console.error('Error fetching seller verification details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
// Handle file upload
async function handleLicenseUpload(req, res, next) {
    // Check if files are uploaded
    if (!req.files || !req.files['frontImage'] || !req.files['backImage']) {
        return res.status(400).json({ error: 'Front and back images are required' });
    }
    // Continue to the next middleware
    next();
}
module.exports = { verifySeller, getSellerVerificationData, handleLicenseUpload};