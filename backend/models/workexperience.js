const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const workSchema = mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String },
  statusOfAppointment: { type: String },
  fromDate: { type: String, required: true },
  toDate: { type: String, required: true },
  monthlySalary: { type: String, required: true },
  salaryGrade: { type: String },
  salaryStep: { type: String },
  government: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("WorkExperience", workSchema);
