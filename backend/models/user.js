const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  employeeNum: { type: Number, required: true, unique: true },
  firstName: { type: String, required: true },
  middleName: { type: String, default: "" },
  lastName: { type: String, required: true },
  extensionName: { type: String, default: "" },
  email: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, default: "" },
  placeofBirth: { type: String, default: "" },
  civilStatus: { type: String, default: "" },
  height: { type: String, default: "" },
  weight: { type: String, default: "" },
  bloodType: { type: String, default: "" },
  citizenship: { type: String, default: "" },
  // birthday    : {
  //     dd      : {type : Number, default: 01},
  //     mm      : {type : Number, default: 01},
  //     yyyy    : {type : Number, default: 2000},
  // },
  birthday: { type: Date, default: Date.now },
  permanentAddress: {
    houseNo: { type: String, default: "" },
    street: { type: String, default: "" },
    barangay: { type: String, default: "" },
    province: { type: String, default: "" },
    zipcode: { type: String, default: "" },
  },
  ResidentAddress: {
    houseNo: { type: String, default: "" },
    street: { type: String, default: "" },
    barangay: { type: String, default: "" },
    province: { type: String, default: "" },
    zipcode: { type: String, default: "" },
  },
  gssId: { type: String, default: "" },
  pagibigId: { type: String, default: "" },
  philHealthId: { type: String, default: "" },
  sssNo: { type: String, default: "" },
  tinNo: { type: String, default: "" },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
