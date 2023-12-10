const jwt = require('jsonwebtoken');

// Middleware to verify if the user is authenticated
exports.authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Bearer TOKEN
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed!' });
    }
};

// Middleware to check if the user is an admin
exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Admin privileges required!' });
    }
};

// Optional: Middleware to check if the user is accessing their own data or is an admin
exports.canAccessUser = (req, res, next) => {
    if (req.user && (req.user.id === req.params.id || req.user.role === 'admin')) {
        next();
    } else {
        res.status(403).json({ message: 'Access denied!' });
    }
};
