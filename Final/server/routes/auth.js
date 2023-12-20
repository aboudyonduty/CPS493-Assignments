const express = require('express');
const router = express.Router();

// Assuming you have an AuthController that handles login and registration logic
const AuthController = require('../controllers/AuthController');

// Login route
router.post('/login', AuthController.login);

// Registration route (if applicable)
router.post('/register', AuthController.register);

module.exports = router;
