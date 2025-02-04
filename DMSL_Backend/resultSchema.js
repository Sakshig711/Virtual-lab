const mongoose = require("mongoose");
const resultSchema = new mongoose.Schema({
    AssignmentNo: Number,
    name: String,
    rollno: Number,
    marks: Number
});

module.exports = mongoose.model("Results", resultSchema);
