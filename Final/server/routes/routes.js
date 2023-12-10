const express = require('express');
const router = express.Router();

// Controllers
const UsersController = require('../controllers/UsersController');
const WorkoutsController = require('../controllers/WorkoutsController');
const AuthController = require('../controllers/AuthController');

// Middleware
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware'); // If you have a separate middleware for admin checks

// Authentication routes
router.post('/login', AuthController.login);
router.post('/register', AuthController.register); // If you have registration

// User routes
// Apply authentication middleware to protect these routes
router.get('/users', authMiddleware.authenticate, adminMiddleware, UsersController.getAllUsers); // Admin only
router.get('/users/:id', authMiddleware.authenticate, UsersController.getUser); // Admin or specific user
router.post('/users', authMiddleware.authenticate, adminMiddleware, UsersController.createUser); // Admin only
router.put('/users/:id', authMiddleware.authenticate, UsersController.updateUser); // Admin or specific user
router.delete('/users/:id', authMiddleware.authenticate, adminMiddleware, UsersController.deleteUser); // Admin only

// Workout routes
// Apply authentication middleware to protect these routes
router.get('/workouts', authMiddleware.authenticate, WorkoutsController.getAllWorkouts); // User-specific
router.get('/workouts/:id', authMiddleware.authenticate, WorkoutsController.getWorkout); // User-specific
router.post('/workouts', authMiddleware.authenticate, WorkoutsController.createWorkout); // User-specific
router.put('/workouts/:id', authMiddleware.authenticate, WorkoutsController.updateWorkout); // User-specific
router.delete('/workouts/:id', authMiddleware.authenticate, WorkoutsController.deleteWorkout); // User-specific

module.exports = router;
