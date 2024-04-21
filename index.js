const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const sellerRoutes = require('./routes/sellerVerificationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const carRoutes = require('./routes/carRoutes');
const inspectionRoutes = require('./routes/inspectionRoutes');
// const { sellerUploadFieldsConfig } = require('./config/multer-config');
require('dotenv').config();

const secretKey = require('crypto').randomBytes(20).toString('hex');

const express = require('express');
const session = require('express-session');
const app = express();
const cors = require('cors');
// Configure session middleware
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true
}));
const upload = multer();
// app.use(upload.fields([{ name: 'frontImage', maxCount: 1 }, { name: 'backImage', maxCount: 1 }]));

// app.use(sellerUploadFieldsConfig);
// app.use(upload.array());
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
    // origin: 'http://localhost:3001' // Frontend origin for my device
    origin: '*' // For all
  }));
// Database connection
const mongoURI = 'mongodb://localhost:27017/car_check_mate';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');

        // Routes

        app.use('/user', upload.none(), userRoutes);
        app.use('/payment', paymentRoutes);
        app.use('/verification', sellerRoutes);
        app.use('/admin', adminRoutes);
        app.use('/cars', carRoutes);
        app.use('/inspections',upload.none(), inspectionRoutes);

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
    });