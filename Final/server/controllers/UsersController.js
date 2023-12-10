const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');

// MongoDB connection details from environment variables
const url = process.env.MONGO_URI;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = process.env.MONGO_DB_NAME;
const usersCollection = 'users';

async function getDb() {
    await client.connect();
    return client.db(dbName);
}

exports.getAllUsers = async (req, res) => {
    try {
        const db = await getDb();
        const users = await db.collection(usersCollection).find({}).toArray();
        res.json(users.map(user => ({ ...user, password: undefined }))); // Exclude passwords
    } catch (error) {
        res.status(500).send('Error retrieving users');
    }
};

exports.getUser = async (req, res) => {
    try {
        const db = await getDb();
        const user = await db.collection(usersCollection).findOne({ _id: ObjectId(req.params.id) });
        if (user) {
            res.json({ ...user, password: undefined });
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Error retrieving user');
    }
};

exports.createUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const newUser = { ...req.body, password: hashedPassword };

        const db = await getDb();
        await db.collection(usersCollection).insertOne(newUser);

        res.status(201).send('User created');
    } catch (error) {
        res.status(500).send('Error creating user');
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 12);
        }

        const db = await getDb();
        await db.collection(usersCollection).updateOne({ _id: ObjectId(req.params.id) }, { $set: updateData });

        res.send('User updated');
    } catch (error) {
        res.status(500).send('Error updating user');
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const db = await getDb();
        await db.collection(usersCollection).deleteOne({ _id: ObjectId(req.params.id) });

        res.send('User deleted');
    } catch (error) {
        res.status(500).send('Error deleting user');
    }
};
