const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new Error('No token provided');
        }

        const token = authHeader.split(' ')[1]; // Assumes 'Bearer TOKEN'
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Adds user data to request object
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};
