// models/formModel.js
const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
    treadDepth: { type: String },
    tyreCondition: { type: String},
    wheelAlignment: { type: String},
    brakePads: { type: String},
    discsDrums: { type: String },
    brakeSystem: { type: String },
    steeringComponents: { type: String },
    shockAbsorbers: { type: String},
    suspensionSystem: { type: String },
    headlights: { type: String },
    brakeLights: { type: String },
    indicators: { type: String },
    seatBelts: { type: String },
    seats: { type: String },
    childRestraintAnchorages: { type: String },
    windscreen: { type: String  },
    wipers: { type: String  },
    visibilityWindows: { type: String },
    bodyPanels: { type: String },
    chassis: { type: String },
    engineCondition: { type: String },
    exhaustSystem: { type: String },
    drivelineComponents: { type: String },
    fluidLeaks: { type: String },
    hornOperation: { type: String },
    roadworthy: { type: String },
    additionalComments: { type: String },
    eRWCSubmitted: { type: Boolean },
    informationTruthChecked: { type: Boolean },
    carId : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    mechanicId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    inspectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const FormModel = mongoose.model('Form', FormSchema);

module.exports = FormModel;


