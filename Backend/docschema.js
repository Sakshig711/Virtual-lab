const mongoose = require("mongoose");
const docSchema = new mongoose.Schema({
  id: Number,
  aim: String,
});

module.exports = mongoose.model("assignments", docSchema);
