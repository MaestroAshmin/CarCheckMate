const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User schema
    title: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    streetName: { type: String, required: true },
    suburb: { type: String, required: true},
    postcode: { type: Number, required: true},
    state: { type: String, required: true},
    color: { type: String, required: true },
    price: { type: Number, required: true },
    odometer: { type: Number, required: true },
    transmission: { type: String, required: true },
    year: { type: Number, required: true },
    engineType: { type: String, required: true },
    fuelType: { type: String, required: true },
    bodyType: { type: String, required: true },
    carPhotos: { type: String,required: true },
    hasBeenSold: { type: Boolean, default: false }
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;