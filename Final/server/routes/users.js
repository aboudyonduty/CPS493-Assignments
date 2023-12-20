const express = require('express');
const router = express.Router();

// Import the UsersController
const UsersController = require('../controllers/UsersController');

// Middleware for authentication and authorization
const authMiddleware = require('../middleware/authMiddleware');

// Define user-related routes

// Get all users (likely admin-only)
router.get('/', authMiddleware.authenticate, UsersController.getAllUsers);

// Get a single user by ID
router.get('/:id', authMiddleware.authenticate, UsersController.getUser);

// Create a new user (could be admin-only or open for user registration)
router.post('/', authMiddleware.authenticate, UsersController.createUser);

// Update a user by ID
router.put('/:id', authMiddleware.authenticate, UsersController.updateUser);

// Delete a user by ID (likely admin-only)
router.delete('/:id', authMiddleware.authenticate, UsersController.deleteUser);

module.exports = router;
