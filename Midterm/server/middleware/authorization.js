const jwt = require('jsonwebtoken');

/**
 * Generates a JWT token for a user.
 * @param {Object} user - The user object for which to generate the token.
 * @returns {String} - The generated JWT token.
 */
function generateToken(user){
    const payload = {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // or use JWT_EXPIRATION from .env
}

/**
 * Verifies a JWT token.
 * @param {String} token - The JWT token to verify.
 * @returns {Object} - The decoded token payload if valid, or null if invalid.
 */
function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error("Token verification failed:", error);
        return null;
    }
}

module.exports = { generateToken, verifyToken };
