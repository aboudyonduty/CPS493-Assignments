const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Load environment variables

const app = express();

// Middlewares
app.use(cors()); // Enable CORS for all requests
app.use(express.json()); // Parse JSON bodies

// MongoDB Connection
const mongoUtil = require('./models/mongo');
mongoUtil.connectToServer((err) => {
    if (err) {
        console.error(err);
        process.exit();
    }
});

// Import routes
const userRoutes = require('./routes/users');
const workoutRoutes = require('./routes/workouts');
const authRoutes = require('./routes/auth');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/auth', authRoutes);

// Serve Vue.js Frontend
app.use(express.static(path.join(__dirname, '../dist')));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
