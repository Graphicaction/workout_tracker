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
  //Getting start date and end date to get data in between
  const today = new Date() 
  const currDay = today.getDay();
  
  const startDay = new Date().setDate(new Date().getDate()-currDay);
  const endDate = new Date().setDate(new Date().getDate());

  Workout.find({
      day: {
        $gte: startDay,
        $lte: endDate
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
