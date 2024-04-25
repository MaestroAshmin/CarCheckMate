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
        ref: 'User',
        required: true
    },
    buyer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    mechanic_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        default: null
    },
    car_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },
    sellerAcceptedInspectionRequest: {
        type: Boolean,
        default: null
    },
    rwcChecks: {
        type: String,
        default: ''
    },
    inspectionStatus: {
        type: Boolean,
        default: null
    }
});

const Inspections = mongoose.model('Inspection', inspectionSchema);

module.exports = Inspections;