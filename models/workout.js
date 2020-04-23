const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//Defininf Schema for workout collection
const workoutSchema = new Schema ({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
          type: Schema.Types.ObjectId,
          ref: "Exercise"
        }
      ]
});

// workoutSchema.methods.setDate = function() {
//     this.day = Date.now();
//     return this.day;
// };

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;