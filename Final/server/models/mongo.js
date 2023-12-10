const { MongoClient } = require('mongodb');

const url = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB_NAME;

let dbInstance = null;

async function connectToMongo() {
    if (dbInstance) return dbInstance;
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    dbInstance = client.db(dbName);
    return dbInstance;
}

module.exports = {
    getDb: connectToMongo
};
