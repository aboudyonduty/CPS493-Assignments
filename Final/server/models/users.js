// بسم الله

/**
 * @typedef {Object} BaseUser
 * @property {number} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} username
 * @property {string} password
 * @property {string} role
 */

const jwt = require("jsonwebtoken");

const { connect } = require("./mongo");
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const bcrypt = require("bcrypt");
const saltRounds = 10;

const { ObjectId } = require("./mongo");

const collectionName = "Users";
async function getCollection() {
  const db = await connect();
  return db.collection(collectionName);
}

async function getAll() {
  const collection = await getCollection();
  return collection.find({}).toArray();
}
async function getUsersById(id) {
  const collection = await getCollection();
  return collection.find({ id: id }).toArray();
}

async function addUser(user) {
  const collection = await getCollection();
  // Check if the username is already in use
  const existingUsername = await collection
    .find({ username: user.username })
    .toArray();
  if (existingUsername.length > 0) {
    throw new Error("Username already in use");
  }
  // Check if the email is already in use
  const existingUser = await collection.find({ email: user.email }).toArray();
  if (existingUser.length > 0) {
    throw new Error("Email already in use");
  }

  // Hasing the password
  user.password = await bcrypt.hash(user.password, saltRounds);

  // Find the maximum id value in the collection
  const maxIdUser = await collection.find().sort({ id: -1 }).limit(1).toArray();
  const maxId = maxIdUser.length > 0 ? maxIdUser[0].id : 0;

  // Assign the next id to the new user
  user.id = maxId + 1;

  // Insert the new user
  const result = await collection.insertOne(user);
  return result;
}

async function deleteUser(id) {
  const collection = await getCollection();
  await collection.deleteOne({ _id: new ObjectId(id) });
}

async function seed() {
  const collection = await getCollection();
  await collection.insertMany(data.users);
}

function generateJWT(user) {
  // Using only essential and non-sensitive information for the token payload
  const payload = {
    id: user.id, // MongoDB _id can also be used depending on your preference
    email: user.email,
    role: user.role,
  };

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
      (err, token) => {
        if (err) {
          console.error("Error generating JWT", err);
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
}

function verifyJWT(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decodedPayload) => {
      if (err) {
        console.error("Error verifying JWT", err);
        reject(err);
      } else {
        resolve(decodedPayload);
      }
    });
  });
}
async function updateUserRole(id, role) {
  const collection = await getCollection();
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { role: role } }
  );
  return result;
}
const searchUsers = async (query) => {
  try {
    const results = await User.find({
      $or: [
        { firstName: new RegExp(query, "i") },
        { lastName: new RegExp(query, "i") },
      ],
    });

    return results;
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
};

module.exports = {
  getAll,
  getUsersById,
  addUser,
  deleteUser,
  generateJWT,
  verifyJWT,
  seed,
  searchUsers,
  updateUserRole,
};
