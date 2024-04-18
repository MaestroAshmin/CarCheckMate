const checkSellerVerification = (req, res, next) => {
    if (req.session.user.sellerVerified !== true) {
        return res.status(403).json({ message: 'Seller is not verified' });
    }
    next();
  };
  
  module.exports = checkSellerVerification;