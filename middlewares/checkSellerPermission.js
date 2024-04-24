const checkSellerPermission = (req, res, next) => {
    const isSeller = req.session.user.seller; 

    if (isSeller) {
        next(); // Seller is allowed, proceed to the next middleware/route handler
    } else {
        res.status(403).json({ message: 'Forbidden: You are not allowed to perform this action.' });
    }
};

module.exports = checkSellerPermission;