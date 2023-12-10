// Load environment variables from .env file
require('dotenv').config({ path: '../.env' });
const UsersController = require('../controllers/UsersController');

const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

async function importUsers() {
    const connectionString = process.env.MONGO_URI;
if (!connectionString) {
    console.error('MONGO_URI is not set in the environment variables');
    return;
}
if (!(connectionString.startsWith('mongodb://') || connectionString.startsWith('mongodb+srv://'))) {
    console.error('Invalid MongoDB connection string');
    return;
}
    const client = new MongoClient(process.env.MONGO_URI);
    try {
        // Connect to MongoDB
        await client.connect();
        const db = client.db(process.env.MONGO_DB_NAME);
        const usersCollection = db.collection('users');

        // Read users.json
        const usersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'users.json'), 'utf-8'));

        // Hash passwords and prepare users
        const users = await Promise.all(usersData.users.map(async user => {
            user.password = await bcrypt.hash(user.password, 12);
            return user;
        }));

        // Insert users into MongoDB
        await usersCollection.insertMany(users);
        console.log('Users imported successfully');
    } catch (error) {
        console.error('Error importing users:', error);
    } finally {
        await client.close();
    }
}

importUsers();
