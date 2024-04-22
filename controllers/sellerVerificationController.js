const SellerVerification = require('../models/SellerVerification');
const fs = require('fs');
const path = require('path');

async function verifySeller(req, res) {
    try {
        // Check if all required fields are provided
        const requiredFields = ['driverLicenseNumber', 'state', 'licenseExpiry', 'cardNumber'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ error: `${field} is required` });
            }
        }
        // get userId from session
        const userId = req.session.user._id;
        // Check if front and back images are provided
        if (!req.files || !req.files['frontImage'] || !req.files['backImage']) {
            return res.status(400).json({ error: 'Front and back images are required' });
        }

        const {driverLicenseNumber, state, licenseExpiry, cardNumber } = req.body;
        // Extract front and back images from req.files
        const frontImage = req.files['frontImage'][0];
        const backImage = req.files['backImage'][0];
        
        // Save images to the file system
        const frontImagePath = path.join(__dirname, '../uploads/', frontImage.originalname);
        const backImagePath = path.join(__dirname, '../uploads/', backImage.originalname);

        // Write image buffers to files
        fs.writeFileSync(frontImagePath, frontImage.buffer);
        fs.writeFileSync(backImagePath, backImage.buffer);

        // Check if the verification has already been done by admin
        const existingVerification = await SellerVerification.findOne({ user: userId });
        if (existingVerification && existingVerification.verifiedByAdmin) {
            // If verification has been approved by admin, disallow updating
            return res.status(400).json({ error: 'Verification already approved by admin, update not allowed' });
        }
        if (existingVerification) {
            // Update the existing verification record
            existingVerification.driverLicenseNumber = driverLicenseNumber;
            existingVerification.state = state;
            existingVerification.licenseExpiry = licenseExpiry;
            existingVerification.cardNumber = cardNumber;
            existingVerification.frontImage = frontImagePath;
            existingVerification.backImage = backImagePath;
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

// Handle file upload
async function handleLicenseUpload(req, res, next) {
    // Check if files are uploaded
    if (!req.files || !req.files['frontImage'] || !req.files['backImage']) {
        return res.status(400).json({ error: 'Front and back images are required' });
    }
    // Continue to the next middleware
    next();
}
module.exports = { verifySeller, handleLicenseUpload};