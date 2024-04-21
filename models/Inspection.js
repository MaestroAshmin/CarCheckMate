const mongoose = require('mongoose');

const inspectionSchema = new mongoose.Schema({
    inspectionDate: {
        type: Date,
        required: true
    },
    inspectionTime: {
        type: String,
        required: true
    },
    seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming there's a User model
        required: true
    },
    buyer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming there's a User model
        required: true
    },
    mechanic_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming there's a User model
        default: null
    },
    car_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car', // Assuming there's a Car model
        required: true
    },
    sellerAcceptedInspectionRequest: {
        type: Boolean,
        default: null
    },
    inspectionStatus: {
        type: Boolean,
        default: false
    }
});

const Inspections = mongoose.model('Inspection', inspectionSchema);

module.exports = Inspections;