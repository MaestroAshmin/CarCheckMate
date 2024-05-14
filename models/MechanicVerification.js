const mongoose = require("mongoose");

// Define MechanicVerification schema
const MechanicVerificationSchema = new mongoose.Schema({
  licenseNumber: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  documentPath: {
    type: String,
    required: true,
  },
  verificationStatus: {
    type: Boolean,
    required: true,
  },
  verificationPending: {
    type: Boolean,
    required: true,
  },
  mechanicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const MechanicVerification = mongoose.model(
  "MechanicVerification",
  MechanicVerificationSchema
);

module.exports = MechanicVerification;
