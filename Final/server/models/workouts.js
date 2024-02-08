
/**
 * @typedef {Object} BaseWorkout
 * @property {number} id
 * @property {string} email
 * @property {string} workoutName
 * @property {string} date
 * @property {number} duration
 * @property {number} calories
 */


const { connect } = require('./mongo');

const { ObjectId } = require('./mongo');

const collectionName = 'Workouts';
async function getCollection() {
  const db = await connect();
  return db.collection(collectionName);
}

async function getAll() {
  const collection = await getCollection();
  return collection.find({}).toArray();
}

async function getWorkoutsByEmail(email) {
  const collection = await getCollection();
  return await collection.find({email: email}).toArray();
}

async function addWorkout(workout) {
  const collection = await getCollection();
  await collection.insertOne(workout);
}
async function deleteWorkout(id) {
    const collection = await getCollection();
    await collection.deleteOne({_id: ObjectId(id)});
    }


module.exports = {
  getAll,getWorkoutsByEmail,addWorkout,deleteWorkout
};