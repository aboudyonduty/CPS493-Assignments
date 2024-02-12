// بسم الله

/**
 * @typedef {Object} BaseWorkout
 * @property {number} id
 * @property {string} workoutName
 * @property {string} date
 * @property {number} duration
 * @property {number} calories
 */

const { connect } = require("./mongo");

const { ObjectId } = require("./mongo");

const collectionName = "Workouts";
async function getCollection() {
  const db = await connect();
  return db.collection(collectionName);
}

async function getAll() {
  const collection = await getCollection();
  return collection.find({}).toArray();
}

async function getWorkoutsById(id) {
  const numberID = Number(id);
  if (isNaN(numberID)) {
    console.error("Invalid ID", id);
  }
  const collection = await getCollection();
  return collection.find({ id: numberID }).toArray();
}

async function addWorkout(workout) {
  const collection = await getCollection();
  await collection.insertOne(workout);
}
async function deleteWorkout(id) {
  const collection = await getCollection();
  await collection.deleteOne({ _id: new ObjectId(id) });
}
async function seed() {
  const collection = await getCollection();
  await collection.insertMany(data.workouts);
}

module.exports = {
  getAll,
  getWorkoutsById,
  seed,
  addWorkout,
  deleteWorkout,
};
