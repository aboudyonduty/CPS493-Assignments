
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
async function getUsersById(id) {
  const collection = await getCollection();
  return collection.find({id: id}).toArray();
}

async function addUser(user) {
  const collection = await getCollection();

  // Find the maximum id value in the collection
  const maxIdUser = await collection.find().sort({id: -1}).limit(1).toArray();
  const maxId = maxIdUser.length > 0 ? maxIdUser[0].id : 0;

  // Assign the next id to the new user
  user.id = maxId + 1;

  // Insert the new user
  const result = await collection.insertOne(user);
  return result;
}

async function deleteUser(id) {
  const collection = await getCollection();
  await collection.deleteOne({_id: new ObjectId(id)});
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
async function updateUserRole(id, role) {
  const collection = await getCollection();
  const result = await collection
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: { role: role } }
    );
  return result;
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
  getAll, getUsersById, addUser, deleteUser, generateJWT, verifyJWT, seed,searchUsers, updateUserRole
};