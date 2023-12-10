const { MongoClient, ObjectId } = require('mongodb');

// MongoDB connection details from environment variables
const url = process.env.MONGO_URI;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = process.env.MONGO_DB_NAME;
const workoutsCollection = 'workouts';

async function getDb() {
    await client.connect();
    return client.db(dbName);
}

exports.getAllWorkouts = async (req, res) => {
    try {
        const db = await getDb();
        // Adjust the query to retrieve only the workouts for the logged-in user or all if admin
        const query = req.user.role === 'admin' ? {} : { userId: req.user.id };
        const workouts = await db.collection(workoutsCollection).find(query).toArray();
        res.json(workouts);
    } catch (error) {
        res.status(500).send('Error retrieving workouts');
    }
};

exports.getWorkout = async (req, res) => {
    try {
        const db = await getDb();
        const workout = await db.collection(workoutsCollection).findOne({ _id: ObjectId(req.params.id), userId: req.user.id });
        res.json(workout);
    } catch (error) {
        res.status(500).send('Error retrieving workout');
    }
};

exports.createWorkout = async (req, res) => {
    try {
        const newWorkout = { ...req.body, userId: req.user.id }; // Link workout to the user

        const db = await getDb();
        await db.collection(workoutsCollection).insertOne(newWorkout);

        res.status(201).send('Workout created');
    } catch (error) {
        res.status(500).send('Error creating workout');
    }
};

exports.updateWorkout = async (req, res) => {
    try {
        const updateData = { ...req.body };

        const db = await getDb();
        await db.collection(workoutsCollection).updateOne({ _id: ObjectId(req.params.id), userId: req.user.id }, { $set: updateData });

        res.send('Workout updated');
    } catch (error) {
        res.status(500).send('Error updating workout');
    }
};

exports.deleteWorkout = async (req, res) => {
    try {
        const db = await getDb();
        await db.collection(workoutsCollection).deleteOne({ _id: ObjectId(req.params.id), userId: req.user.id });

        res.send('Workout deleted');
    } catch (error) {
        res.status(500).send('Error deleting workout');
    }
};
