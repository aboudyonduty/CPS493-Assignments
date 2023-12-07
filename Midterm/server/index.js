require('dotenv').config();
const express = require('express');
const { connectToMongoDB } = require('./models/mongo');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToMongoDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

    // Define your routes here
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
    
    // Other routes and middleware...
}).catch(error => {
    console.error('Failed to connect to MongoDB:', error);
});

// Optional: Additional error handling, etc.
