const mongoose = require('mongoose');

// Define Mongoose schema for seller verification
const sellerVerificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User schema
    driverLicenseNumber: { type: String, required: true },
    state: { type: String, required: true },
    licenseExpiry: { type: Date, required: true },
    cardNumber: { type: String, required: true },
    frontImage: { type: String, required: true },
    backImage: { type: String, required: true },
    verifiedByAdmin: { type: Boolean, default: false }
});

const SellerVerification = mongoose.model('SellerVerification', sellerVerificationSchema);

module.exports = SellerVerification;