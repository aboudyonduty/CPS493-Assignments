
/**
 * @typedef {Object} BaseUser
 * @property {string} _id
 * @property {number} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} username
 * @property {string} password
 * @property {string} role
 */

const data = require("../data/users.json");

const jwt = require('jsonwebtoken');

const { connect } = require('./mongo');
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const { ObjectId } = require('./mongo');

const collectionName = 'Users';
async function getCollection() {
  const db = await connect();
  return db.collection(collectionName);
}

async function getAll() {
  const collection = await getCollection();
  return collection.find({}).toArray();
}

async function addUser(user) {
  const collection = await getCollection();
  await collection.insertOne(user);
}

async function deleteUser(id) {
    const collection = await getCollection();
    await collection.deleteOne({_id: ObjectId(id)});
    }

async function getUserByEmail(email) {
  const collection = await getCollection();
  return await collection.findOne({ email });
}

async function seed() {
  const collection = await getCollection();
  await collection.insertMany(data.users);
}



function generateJWT(user) {
  return new Promise((resolve, reject) => {
    jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } , (err, token) => {
      if(err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  })
}

function verifyJWT(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if(err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  })
}
const searchUsers = async (query) => {
  try {
    const results = await User.find({
      $or: [
        { firstName: new RegExp(query, 'i') },
        { lastName: new RegExp(query, 'i') },
      ],
    });

    return results;
  } catch (error) {
    console.error('Error searching users:', error);
    throw error; 
  }
};


module.exports = {
  getAll, addUser, deleteUser, generateJWT, verifyJWT, seed, getUserByEmail,searchUsers
};