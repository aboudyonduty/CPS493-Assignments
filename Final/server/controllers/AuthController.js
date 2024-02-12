const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UsersModel = require('../models/users'); // Adjust the path as needed

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UsersModel.getUserByEmail(email); // Implement this method in UsersModel

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.json({ token, userId: user._id, role: user.role });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
};


exports.register = async (req, res) => {
//Registration logic here
};
