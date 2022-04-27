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
  birthday: { type: Date, default: Date.now },
  gssId: { type: String, default: "" },
  pagibigId: { type: String, default: "" },
  philHealthId: { type: String, default: "" },
  sssNo: { type: String, default: "" },
  tinNo: { type: String, default: "" },
  //Contact Info -------------
  houseNoP: { type: String, default: "" },
  streetP: { type: String, default: "" },
  locationTypeP: { type: String, default: "" },
  barangayP: { type: String, default: "" },
  provinceP: { type: String, default: "" },
  zipP: { type: String, default: "" },
  houseNoR: { type: String, default: "" },
  streetR: { type: String, default: "" },
  locationTypeR: { type: String, default: "" },
  barangayR: { type: String, default: "" },
  provinceR: { type: String, default: "" },
  zipR: { type: String, default: "" },
  telephoneNum: { type: String, default: "" },
  cellphoneNum: { type: String, default: "" },
  alternateEmail: { type: String, default: "" },

  //for account access
  permission : { type: String, default : 'pending'},
  education : [{type: mongoose.Types.ObjectId, required : true, ref : 'Education'}],

  //for employee type and faculty

  faculty : { type: String, default: ""},
  employmentType : {type : String, default: ""}
});

module.exports = mongoose.model("User", userSchema);
