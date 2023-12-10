const mongo = require('./mongo');

async function getAllUsers() {
    const db = await mongo.getDb();
    return db.collection('users').find({}).toArray();
}

async function getUserById(id) {
    const db = await mongo.getDb();
    return db.collection('users').findOne({ _id: new ObjectId(id) });
}

async function createUser(userData) {
    const db = await mongo.getDb();
    return db.collection('users').insertOne(userData);
}

async function updateUser(id, userData) {
    const db = await mongo.getDb();
    return db.collection('users').updateOne({ _id: new ObjectId(id) }, { $set: userData });
}

async function deleteUser(id) {
    const db = await mongo.getDb();
    return db.collection('users').deleteOne({ _id: new ObjectId(id) });
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
