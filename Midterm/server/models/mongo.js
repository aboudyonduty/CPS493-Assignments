const { MongoClient } = require('mongodb');
require('dotenv').config();
console.log('DB URI:', process.env.DB_URI);


const dbUri = process.env.DB_URI;

let db;

const connectToMongoDB = async () => {
    try {
        const client = new MongoClient(dbUri);
        await client.connect();
        db = client.db(); // Specify the database name if necessary
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Could not connect to MongoDB:", error);
        process.exit(1);
    }
};

const getDb = () => {
    if (!db) {
        throw new Error('DB not initialized');
    }
    return db;
};
const client = new MongoClient(dbUri);


module.exports = { connectToMongoDB, getDb };
