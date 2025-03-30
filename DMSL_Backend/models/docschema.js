const mongoose = require("mongoose");
const docSchema = new mongoose.Schema({
    id: Number,
    aim: String,
    problemStatement: String,
    objective:Array,
    title:String
});

module.exports = mongoose.model("assignments", docSchema);
