// بسم الله

const express = require("express");
const {
  getAll,
  addWorkout,
  deleteWorkout,
  getWorkoutsById,
  deleteAllWorkoutsById,
} = require("../models/workouts");
const { requireUser } = require("../middleware/authorization");
const router = express.Router();

router
  .get("/", requireUser(), (req, res, next) => {
    getAll(req.user.userId)
      .then((workouts) => res.send(workouts))
      .catch(next);
  })
  .get("/getWorkoutsById/:id", requireUser(), (req, res, next) => {
    const { id } = req.params;
    getWorkoutsById(id)
      .then((workouts) => res.send(workouts))
      .catch(next);
  })
  .post("/addWorkout", requireUser(), (req, res, next) => {
    let workout = req.body;
    workout.userId = req.user.userId;
    addWorkout(workout)
      .then((x) => res.send({ data: x, isSuccess: true }))
      .catch(next);
  })
  .delete("/deleteWorkout/:_id", requireUser(), (req, res, next) => {
    const { _id } = req.params;
    deleteWorkout(_id)
      .then(() => res.send({ message: "Workout deleted" }))
      .catch(next);
  })
  .delete("/deleteAllWorkoutsById/:id", requireUser(), (req, res, next) => {
    const { id } = req.params;
    deleteAllWorkoutsById(id)
      .then(() => res.send({ message: "All workouts deleted" }))
      .catch(next);
  });

module.exports = router;
