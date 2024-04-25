const checkMechanicPermission = (req, res, next) => {
    const isMechanic = req.session.user.mechanic; 

    if (isMechanic) {
        next(); // Mechanic is allowed, proceed to the next middleware/route handler
    } else {
        res.status(403).json({ message: 'Forbidden: You are not allowed to perform this action.' });
    }
};

module.exports = checkMechanicPermission;