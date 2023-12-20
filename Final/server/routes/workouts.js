const express = require('express');
const router = express.Router();

// Import the WorkoutsController
const WorkoutsController = require('../controllers/WorkoutsController');

// Middleware for authentication
const authMiddleware = require('../middleware/authMiddleware');

// Define workout-related routes

// Get all workouts for the logged-in user
router.get('/', authMiddleware.authenticate, WorkoutsController.getAllWorkouts);

// Get a single workout by ID
router.get('/:id', authMiddleware.authenticate, WorkoutsController.getWorkout);

// Create a new workout
router.post('/', authMiddleware.authenticate, WorkoutsController.createWorkout);

// Update a workout by ID
router.put('/:id', authMiddleware.authenticate, WorkoutsController.updateWorkout);

// Delete a workout by ID
router.delete('/:id', authMiddleware.authenticate, WorkoutsController.deleteWorkout);

module.exports = router;
