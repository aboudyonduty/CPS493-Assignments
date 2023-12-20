const { MongoClient } = require('mongodb');

// MongoDB connection details from environment variables
const url = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB_NAME;
let dbInstance = null;

// Function to connect to MongoDB
async function connectToMongo() {
    if (dbInstance) {
        // Return existing db instance if already connected
        return dbInstance;
    }

    try {
        // Create a new MongoClient and connect
        const client = new MongoClient(url);
        await client.connect();
        console.log("Connected to MongoDB");

        // Assign and return the database instance
        dbInstance = client.db(dbName);
        return dbInstance;
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw error; // Rethrow to handle it in calling function
    }
}

// Function to get the database instance
function getDb() {
    if (!dbInstance) {
        throw new Error("Database not connected. Call connectToMongo first.");
    }
    return dbInstance;
}

module.exports = {
    connectToMongo,
    getDb
};
