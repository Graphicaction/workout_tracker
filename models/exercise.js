const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//Defininf Schema for exercise collection
const exerciseSchema = new Schema ({
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: "Enter the name of exercise",
        trim: true
    },
    duration: {
        type: Number,
        required: "Enter a duration of exercise"
    },
    distance: Number,
    weight: Number,
    sets: Number,
    reps: Number
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;