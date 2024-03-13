// بسم الله

const { MongoClient, ObjectId } = require("mongodb");
const uri = process.env.MONGO_URI;
const DB_NAME = process.env.MONGO_DB_NAME;

const client = new MongoClient(uri);

async function connect() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    return client.db(DB_NAME);
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
    process.exit(1); // Exit in case of database connection error
  }
}

module.exports = {
  connect,
  ObjectId,
};
