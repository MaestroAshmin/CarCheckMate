const mongoose = require('mongoose');

// User schema
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    firstName: String,
    lastName: String,
    verificationToken: String,
    verificationTokenExpires: Date,
});

module.exports = mongoose.model('User', userSchema);