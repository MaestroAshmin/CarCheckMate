const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const token = require('crypto').randomBytes(20).toString('hex');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/user_registration', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// User schema
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    verificationToken: String,
    verificationTokenExpires: Date,
});

const User = mongoose.model('User', userSchema);

// Express route for user registration
app.post('/register', async (req, res) => {
    try {
            const { email, password } = req.body;
        
            // Check if the user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }
    
            // Generate a verification token and set expiration time to 1 Day
            const verificationToken = token;;
            const verificationTokenExpires = new Date();
            verificationTokenExpires.setDate(verificationTokenExpires.getDate() + 1); // 1 day
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
    
            // Create a new user with the verification token and token expiration time
            const newUser = new User({ email, password: hashedPassword, verificationToken,  verificationTokenExpires });
            await newUser.save();
        
            // Send verification email
            sendVerificationEmail(newUser.email, verificationToken);
        
            res.json({ message: 'User registered successfully. Check your email for verification.' });
        }
        catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
        }
});
  

// Function to send verification email
async function sendVerificationEmail(email, token) {
try {
    const verificationLink = `http://localhost:3000/verify?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;

    // Create a nodemailer transporter using the test account
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'karkiashmin1996@gmail.com',
            pass: 'tlwvzxqguvwqsbks'
        }
    });

    // Send email with verification link
    const info = await transporter.sendMail({
        from: '<no-reply@carcheckmate.com>',
        to: email,
        subject: 'User Registration - Email Verification',
        text: 'Click the following link to verify your email: ' + verificationLink ,
    });

    console.log('Email sent: ', info);

    console.log(`Verification link: ${verificationLink}`);
    } catch (error) {
        console.error('Error sending email: ', error);
    }
}

// Route to handle email verification
app.get('/verify', async (req, res) => {
    try {
        const { email, token } = req.query;

        // Find the user by email and verification token
        const user = await User.findOne({ email, verificationToken: token });

        if (!user || user.isVerified) {
            return res.status(400).json({ error: 'Invalid verification link' });
        }

        // Check if the verification token has expired
        if (user.verificationTokenExpires < new Date()) {
            return res.status(400).json({ error: 'Verification token has expired' });
        }
        // Update the user to mark them as verified
        user.isVerified = true;
        user.verificationToken = undefined; // Remove the verification token
        user.verificationTokenExpires = undefined; // Remove the expiration time
        await user.save();

        res.json({ message: 'Email verified successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 