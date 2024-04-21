const checkSellerPermission = (req, res, next) => {
    // Assuming the user role is stored in the session
    const isSeller = req.session.user.seller; // Adjust this based on your session structure

    if (isSeller) {
        next(); // Seller is allowed, proceed to the next middleware/route handler
    } else {
        res.status(403).json({ message: 'Forbidden: You are not allowed to perform this action.' });
    }
};

module.exports = checkSellerPermission;