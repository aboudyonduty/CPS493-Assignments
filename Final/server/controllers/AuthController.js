const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const usersModel = require('../models/users'); // Assuming you have a users model

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usersModel.getUserByEmail(email);

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).send('Authentication failed');
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).send('Error logging in user');
    }
};
