const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  dateOfRegistration: { type: Date },
  attempts: { type: Number },
  employeeNum: { type: Number, required: true },
  firstName: { type: String, required: true },
  middleName: { type: String, default: "" },
  lastName: { type: String, required: true },
  extensionName: [{ type: Object }],
  suffixName: { type: String, default: "" },
  email: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, default: "" },
  placeofBirth: { type: String, default: "" },
  civilStatus: { type: String, default: "" },
  height: { type: String, default: "" },
  weight: { type: String, default: "" },
  bloodType: { type: String, default: "" },
  citizenship: { type: String, default: "" },
  birthday: { type: Date, default: "" },
  gssId: { type: String, default: "" },
  pagibigId: { type: String, default: "" },
  philHealthId: { type: String, default: "" },
  sssNo: { type: String, default: "" },
  tinNo: { type: String, default: "" },
  //Contact Info -------------
  isSameAddress: { type: Boolean },
  houseNoP: { type: String, default: "" },
  streetP: { type: String, default: "" },
  locationTypeP: { type: String, default: "" },
  regionP: { type: String, default: "" },
  provinceP: { type: String, default: "" },
  cityP: { type: String, default: "" },
  barangayP: { type: String, default: "" },
  zipP: { type: String, default: "" },
  //Resident
  houseNoR: { type: String, default: "" },
  streetR: { type: String, default: "" },
  locationTypeR: { type: String, default: "" },
  regionR: { type: String, default: "" },
  provinceR: { type: String, default: "" },
  cityR: { type: String, default: "" },
  barangayR: { type: String, default: "" },
  zipR: { type: String, default: "" },
  //Additional Info
  telephoneNum: { type: String, default: "" },
  cellphoneNum: { type: String, default: "" },
  alternateEmail: { type: String, default: "" },

  //for account access
  permission: { type: String, default: "pending" },
  education: [
    { type: mongoose.Types.ObjectId, required: true, ref: "Education" },
  ],
  civil: [{ type: mongoose.Types.ObjectId, required: true, ref: "Civil" }],
  work: [
    { type: mongoose.Types.ObjectId, required: true, ref: "WorkExperience" },
  ],
  training: [
    { type: mongoose.Types.ObjectId, required: true, ref: "Training" },
  ],

  //for employee type and faculty

  faculty: { type: String, default: "" },
  employmentType: { type: String, default: "" },

  //for profile
  profilePic: { type: String, default: "" },

  //announcement
  announcementCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("User", userSchema);
