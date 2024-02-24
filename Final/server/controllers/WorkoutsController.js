// بسم الله

const express = require("express");
const {
  getAll,
  addWorkout,
  deleteWorkout,
  getWorkoutsById,
} = require("../models/workouts");
const { requireUser } = require("../middleware/authorization");
const router = express.Router();

router
  .get("/", requireUser(true), (req, res, next) => {
    res.send(getAll());
  })

  .get("/getAllWorkouts", (req, res, next) => {
    getAll()
      .then((users) => res.send(users))
      .catch(next);
  })

  .get("/getWorkoutsById/:id", (req, res, next) => {
    const { id } = req.params;
    getWorkoutsById(id)
      .then((workouts) => res.send(workouts))
      .catch(next);
  })

  .post("/addWorkout", (req, res, next) => {
    addWorkout(req.body)
      .then((x) => {
        const data = { data: x, isSuccess: true };
        res.send(data);
      })
      .catch(next);
  })
  .delete("/deleteWorkout/:_id", (req, res, next) => {
    const { _id } = req.params;
    deleteWorkout(_id)
      .then(() => res.send({ message: "Workout deleted" }))
      .catch(next);
  });

module.exports = router;
