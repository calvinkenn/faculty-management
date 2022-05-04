const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const civilScema = mongoose.Schema({
  career: { type: String, required: true },
  rating: { type: String, required: true },
  degree: { type: String },
  date: { type: Date, default: Date.now },
  placeOfExam: { type: String, required: true },
  licenseNumber: { type: String },
  licenseValidity: { type: Date },
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Civil", civilScema);
