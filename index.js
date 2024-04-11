const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const sellerRoutes = require('./routes/sellerVerificationRoutes');
// const gridFSMiddleware = require('./middlewares/gridFSMiddleware');
// const multerMiddleware = require('./middlewares/multerMiddleware');

// const uploadRoutes = require('./routes/uploadRoutes');

require('dotenv').config();

const secretKey = require('crypto').randomBytes(20).toString('hex');

const express = require('express');
const session = require('express-session');
const app = express();

// Configure session middleware
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true
}));
const upload = multer();
app.use(upload.fields([{ name: 'frontImage', maxCount: 1 }, { name: 'backImage', maxCount: 1 }]));
// const { upload } = multerMiddleware;
// console.log(upload);
// Multer middleware for file uploads
// const upload = multer({ dest: 'uploads/' });
// console.log(upload);
// Multer middleware for file uploads should be used before any routes that handle file uploads

// app.use('/uploads', upload.single('file'), multerMiddleware.uploadFiles); // Use single() if uploading a single file
// app.post('/uploads', upload.fields([{ name: 'frontImage', maxCount: 1 }, { name: 'backImage', maxCount: 1 }]), (req,res)=> {
//     console.log(req.body);
//     console.log(req.files);
// });
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.json());
// Database connection
const mongoURI = 'mongodb://localhost:27017/car_check_mate';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        // const db = mongoose.connection;

        // Initialize GridFSBucket
        // multerMiddleware.initializeGridFSBucket(db);

        // Routes

        app.use('/user', userRoutes);
        app.use('/payment', paymentRoutes);
        app.use('/verification', sellerRoutes);

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
    });