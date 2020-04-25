const router = require("express").Router();
const Workout = require("../models/workout");
const Exercise = require("../models/exercise");

router.post("/api/workouts", ({ body }, res) => {
    //Creating a new workout
    Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id",(req, res) => {
  //Adding new exercise into a workout
  let data = req.body;
  Exercise.create(data)
    .then(({ _id }) => Workout.findByIdAndUpdate({_id: req.params.id}, { $push: { exercises: _id } }, { new: true}))
    .then(dbExercise => {
      res.json(dbExercise);
    })
    .catch ( err => {
      res.json(err);
    });
});

router.get("/api/workouts", (req, res) => {
  //Getting all workouts
    Workout.find({})
      .populate("exercises")
      .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  //Getting start date from where we need to display data on chart
  const startDay = new Date().setDate(new Date().getDate()-7);
  Workout.find({
      day: {
        $gte: startDay
      }
    })
    .populate("exercises")
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    })
});

module.exports = router;
