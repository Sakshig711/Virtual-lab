const mongoose = require("mongoose");
const resultSchema = new mongoose.Schema({
    rollno: {type:Number, required:true, unique:true},
    name: {type:String, required:true},
    totalMarks: {type:Number, default: 0},
    assignments: [{
        assignmentNo: Number,
        marks: Number
    }]
});

module.exports = mongoose.model("Results", resultSchema);
