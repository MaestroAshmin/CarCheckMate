const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const token = require('crypto').randomBytes(20).toString('hex');
// const jwt = require('jsonwebtoken');

// Express route for user registration
async function register(req, res) {
    try {
            const { email, password, confirmPassword, firstName, lastName, mobileNumber, userType  } = req.body;
        
            // Check if the user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }
            // Check if the password and confirm password match
            if (password !== confirmPassword) {
                return res.status(400).json({ error: 'Passwords do not match' });
            }
            // Ensure that only one user type is selected
            if (!(userType === 'buyer' || userType === 'seller' || userType === 'mechanic')) {
                return res.status(400).json({ error: 'Invalid user type' });
            }
            // Generate a verification token and set expiration time to 1 Day
            const verificationToken = token;;
            const verificationTokenExpires = new Date();
            verificationTokenExpires.setDate(verificationTokenExpires.getDate() + 1); // 1 day
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            // Create a new user with the verification token and token expiration time
            const newUser = new User({ 
                email, 
                password: hashedPassword,
                firstName,
                lastName,
                mobileNumber,
                [userType] : true, // Setting the selected user type to true
                sellerVerified: false, // By default seller is not verified during account creation
                mechanicVerified: false, // By default mechanic is not verified during account creation
                emailVerified : false, // User has to verify email after account creation
                verificationToken,  
                verificationTokenExpires
            });
            await newUser.save();
        
            // Send verification email
            sendVerificationEmail(newUser.email, verificationToken);
        
            res.json({ message: 'User registered successfully. Check your email for verification.' });
        }
        catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
        }
}
  

// Function to send verification email
async function sendVerificationEmail(email, token) {
try {
    const verificationLink = `http://localhost:3000/user/verify?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;

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
async function verifyEmail(req, res) {
    try {
        const { email, token } = req.query;

        // Find the user by email and verification token
        const user = await User.findOne({ email, verificationToken: token });

        if (!user || user.isVerified) {
            return res.status(400).json({ status: false, error: 'Invalid verification link' });
        }

        // Check if the verification token has expired
        if (user.verificationTokenExpires < new Date()) {
            return res.status(400).json({ status: false, error: 'Verification token has expired' });
        }
        // Update the user to mark them as verified
        user.emailVerified = true;
        user.verificationToken = undefined; // Remove the verification token
        user.verificationTokenExpires = undefined; // Remove the expiration time
        await user.save();

        return res.status(200).json({ status: true, message: 'Email verified successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, error: 'Internal Server Error' });
        }
}

//Check login
async function login (req, res){
    try {
        const { email, password } = req.body;
        // Check if user is already logged in
        if (req.session.user) {
            return res.status(401).json({ status: false, error: 'User already logged in' });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        console.log(user);
        // If user not found or password doesn't match, return error
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ status: false, error: 'Invalid email or password' });
        }
  
        // If user is not verified, return error
        if (!user.emailVerified) {
            return res.status(401).json({ status: false, error: 'Email not verified' });
        }
    
        // Generate JWT token
        // const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
        // Send token in response
        //  res.json({ token });

        // Save user data to session
        req.session.user = user;

        // Ensure session data is saved
        req.session.save();
        res.status(200).json({ status: true, message: 'Login Successful', user });
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ status: false, error: 'Internal Server Error' });
    }
}
// Logout endpoint
function logout(req, res) {
    try {
        // Destroy session to logout
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ status: false, error: 'Unable to logout' });
            }
            res.status(200).json({ status: true, message: 'Logout successful' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, error: 'Internal Server Error' });
    }
}
module.exports = { register, sendVerificationEmail, verifyEmail, login, logout };