const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Load environment variables

const mongoUtil = require('./models/mongo');
const userRoutes = require('./routes/users');
const workoutRoutes = require('./routes/workouts');
const authRoutes = require('./routes/auth');

const app = express();

// Apply middlewares
app.use(cors()); // Enable CORS for all requests
app.use(express.json()); // Parse JSON request bodies

// Function to start the Express server
async function startServer() {
    try {
        // Connect to MongoDB
        await mongoUtil.connectToMongo();
        console.log("Successfully connected to MongoDB.");

        // Define routes
        app.use('/api/auth', authRoutes);
        app.use('/api/users', userRoutes);
        app.use('/api/workouts', workoutRoutes);

        // Serve static files from the Vue frontend app
        app.use(express.static(path.join(__dirname, '../dist')));

        // Start the server
        const PORT = process.env.PORT ?? 3000;
        app.listen(PORT, () => {
            console.log(`Server running on port at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
}

startServer();
