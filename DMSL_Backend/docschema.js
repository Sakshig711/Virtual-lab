const mongoose = require("mongoose");
const docSchema = new mongoose.Schema({
    id: Number,
    aim: String,
    problemStatement: String,
    objective:Array
});

module.exports = mongoose.model("assignments", docSchema);
