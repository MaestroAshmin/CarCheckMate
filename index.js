// TAP/index.js
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const sellerRoutes = require('./routes/sellerVerificationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const carRoutes = require('./routes/carRoutes');
const inspectionRoutes = require('./routes/inspectionRoutes');
const searchRoutes= require('./routes/searchRoutes');

const inspectionStatusRoutes = require('./routes/inspectionStatusRoutes');
const path = require('path');
// const { sellerUploadFieldsConfig } = require('./config/multer-config');
require('dotenv').config();

const secretKey = require('crypto').randomBytes(20).toString('hex');

const express = require('express');
const session = require('express-session');
// const MongoDBStore = require('connect-mongodb-session')(session);
const app = express();
const cors = require('cors');

// Create a new MongoDBStore instance
// const store = new MongoDBStore({
//     uri: 'mongodb://localhost:27017/car_check_mate',
//     collection: 'sessions'
// });

// Catch errors
// store.on('error', function(error) {
//     console.error(error);
// });

app.use(cors({
    origin: 'http://localhost:3001', // Frontend origin for my device
    // origin: '*', // For all
    credentials: true
  }));
// Configure session middleware
app.use(session({
    secret: "cY1r5blzH6Q4tzNe5pGTGq4ddkfyQuOH",
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: true, // Ensures the cookie is only sent over HTTPS
        httpOnly: true, // Helps mitigate XSS attacks
        sameSite: 'none' // Allows cross-origin requests with credentials
    }
}));
const upload = multer();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.json());

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

        app.use('/inspection-status', upload.none(), inspectionStatusRoutes);

        app.use('/search',upload.none(), searchRoutes);
        app.use('/inspection-status', inspectionStatusRoutes);

        app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
    });