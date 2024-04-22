const mongoose = require('mongoose');

// User schema
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    mobileNumber: String,
    buyer: { type: Boolean, default:false },
    seller: { type: Boolean, default:false },
    mechanic: { type: Boolean, default: false },
    sellerVerified: { type: Boolean, default: false },
    mechanicVerified: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: false },
    verificationToken: String,
    verificationTokenExpires: Date,
});

module.exports = mongoose.model('User', userSchema);