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

  .post('/addWorkout', (req, res, next) => {
    addWorkout(req.body)
      .then((x)=> {
        const data = { data: x, isSuccess: true };
        res.send(data);
      })
      .catch(next);
  })
  .delete('/deleteWorkout/:id', (req, res, next) => {
    const { id } = req.params;
    deleteWorkout(id)
      .then(() => res.send({ message: 'Workout deleted' }))
      .catch(next);
  })


module.exports = router;