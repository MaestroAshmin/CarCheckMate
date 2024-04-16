// adminController.js

const SellerVerification = require('../models/SellerVerification');

// Get all pending seller verifications
async function getPendingSellerVerifications(req, res) {
    try {
        const pendingVerifications = await SellerVerification.find({ verifiedByAdmin: false });
        res.status(200).json({ status: true, data: pendingVerifications });
    } catch (error) {
        console.error('Error getting pending verifications:', error);
        res.status(500).json({ status: false, error: 'Internal Server Error' });
    }
}

// Verify a single seller verification by ID
async function verifySellerVerification(req, res) {
    try {
        const verificationId = req.params.id;
        const verification = await SellerVerification.findById(verificationId);
        if (!verification) {
            return res.status(404).json({ status: false, error: 'Verification not found' });
        }
        // Update verification status to verified by admin
        verification.verifiedByAdmin = true;
        await verification.save();
        res.status(200).json({ status: true, message: 'Verification updated successfully' });
    } catch (error) {
        console.error('Error verifying verification:', error);
        res.status(500).json({ status: false, error: 'Internal Server Error' });
    }
}

module.exports = { getPendingSellerVerifications, verifySellerVerification };