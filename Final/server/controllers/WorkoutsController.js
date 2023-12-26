const express = require('express');
const { getAll, getWorkoutsByEmail,addWorkout,deleteWorkout } = require('../models/workouts');
const { requireUser } = require('../middleware/authorization');
const router = express.Router();

router.get('/', requireUser(true), (req, res, next) => {
  res.send(getAll());
})

  .get('/getAllWorkouts', (req, res, next) => {
    getAll()
      .then(users => res.send(users))
      .catch(next);
  })


  .get('/getWorkoutsByEmail/:email', (req, res, next) => {
    const { email } = req.params;
    getWorkoutsByEmail(email)
      .then(user => res.send(user))
      .catch(next);
  })

  .post('/addWorkout', async (req, res) => {
    try {
      const workout = req.body; // Your workout data from the client
      await addWorkout(workout); // Assuming addWorkout is a method from workouts.js
      res.status(200).send('Workout added successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error adding workout');
    }
  })
  .delete('/deleteWorkout/:id', (req, res, next) => {
    const { id } = req.params;
    deleteWorkout(id)
      .then(() => res.send({ message: 'Workout deleted' }))
      .catch(next);
  })


module.exports = router;