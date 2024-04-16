function requireLogin(req, res, next) {
    if (req.session.user && req.session.user._id) {
        // User is logged in
        next();
    } else {
        // User is not logged in
        res.status(401).json({ error: 'Unauthorized: User must be logged in' });
    }
}

module.exports = { requireLogin };