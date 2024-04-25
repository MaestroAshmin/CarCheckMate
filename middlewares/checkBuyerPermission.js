// Middleware to check if the buyer is allowed to book an inspection
const checkBuyerPermission = (req, res, next) => {
    const isBuyer = req.session.user.buyer;
    // Check if the buyer flag is set to true
    if (isBuyer) {
        next(); // Buyer is allowed, proceed to the next middleware/route handler
    } else {
        res.status(403).json({ message: 'Forbidden: You are not allowed to book inspections.' });
    }
};

module.exports = checkBuyerPermission;