const mongoose = require('mongoose');

// Availability schema
const availabilitySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    availabilities: {
        Monday: Boolean,
        Tuesday: Boolean,
        Wednesday: Boolean,
        Thursday: Boolean,
        Friday: Boolean,
        Saturday: Boolean,
        Sunday: Boolean
    }
});

module.exports = mongoose.model('Availability', availabilitySchema);