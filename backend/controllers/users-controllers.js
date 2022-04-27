const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Admin = require('../models/admin');
const Education = require("../models/education");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");


const signup = async (req, res, next) => {
  const errors = validationResult(req);
  //checking for validation errors
  if (!errors.isEmpty()) {
    errorsList = errors.array();
    const newList = errorsList.map((error) => error.param + " : " + error.msg);
    const error = new HttpError(newList[0], 500);
    return next(error);
  }
  //gather all the data from request
  const { employeeNum, firstName, lastName, email, password } = req.body;

  //check if user exist
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
    if(!existingUser){
      existingUser = await Admin.findOne({username: email})
    }
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }
  //if user exist do something
  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }
  //hash user password for added website security
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  //if not create a new user
  const createdUser = new User({
    employeeNum,
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  try {
    await createdUser.save();
  } catch (err) {
    console.log(err.message);
    const error = new HttpError(
      err.message || "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }
  res.status(201).json({
    message: "SignUp Sucess, Please wait for the admin to accept your request",
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  let isValidPassword = false;

  //for admin
  try {
    existingUser = await Admin.findOne({username : email});

    if(existingUser || password === existingUser.password){
      
      let token = jwt.sign({ adminId: existingUser.id}, "superidol", {
        expiresIn: "1h",
      });
      return res.json({
        admin: "Logged in!",
        adminId: existingUser.id,
        token: token,
      });
    }
  }catch(err){

  }
  //check if user is existing
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Loggin in failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }
  //check if hash is correct
  isValidPassword = await bcrypt.compare(password, existingUser.password);
  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }


  if(existingUser.permission === 'pending'){
    const error = new HttpError(
      "Account not verified yet, please wait for admin to verify your account.",
      401
    );
    return next(error);
  }else if (existingUser.permission === 'rejected'){
    const error = new HttpError(
      "Account access rejected. if you think this was a mistake, please contact admin immediately.",
      401
    );
    return next(error);
  }

  //sign user with token for authentication
  let token = jwt.sign({ userId: existingUser.id, email: email }, "superidol", {
    expiresIn: "1h",
  });
  res.json({
    message: "Logged in!",
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};
const getuserData = async (req, res, next) => {
  const { userId } = req.body;
  const user = await User.findById(userId, "-password");
  res.json({ userData: user });
};

const editBasicInfo = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const {
    userId,
    firstName,
    lastName,
    middleName,
    extensionName,
    placeofBirth,
    gender,
    birthday,
    civilStatus,
    height,
    weight,
    bloodType,
    gssId,
    pagibigId,
    philHealthId,
    sssNo,
    tinNo,
    citizenship,
  } = req.body;

  const user = await User.findByIdAndUpdate(userId, {
    firstName,
    lastName,
    middleName,
    extensionName,
    placeofBirth,
    gender,
    birthday,
    civilStatus,
    height,
    weight,
    bloodType,
    gssId,
    pagibigId,
    philHealthId,
    sssNo,
    tinNo,
    citizenship,
  });
  let updatedUser;
  if (user) {
    updatedUser = await User.findById(userId);
  }
  res.status(200).json({ message: "Update Success", updatedUser: updatedUser });
};

const editContactInfo = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const {
    userId,
    houseNoP,
    streetP,
    locationTypeP,
    barangayP,
    provinceP,
    zipP,
    houseNoR,
    streetR,
    locationTypeR,
    barangayR,
    provinceR,
    zipR,
    telephoneNum,
    cellphoneNum,
    alternateEmail,
  } = req.body;

  const user = await User.findByIdAndUpdate(userId, {
    houseNoP,
    streetP,
    locationTypeP,
    barangayP,
    provinceP,
    zipP,
    houseNoR,
    streetR,
    locationTypeR,
    barangayR,
    provinceR,
    zipR,
    telephoneNum,
    cellphoneNum,
    alternateEmail,
  });
  let updatedUser;
  if (user) {
    updatedUser = await User.findById(userId);
  }
  res.status(200).json({ message: "Update Success", updatedUser: updatedUser });
};

const addEducation = async (req, res ,next) =>{
  const {level, school, degree, fromDate, toDate, awards, userId,address} =  req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  let user = await User.findById(userId);
  
  const newEducation = new Education({
    level,
    school,
    degree,
    fromDate,
    toDate,
    awards :awards,
    address,
    user : userId
  });
  const sess = await  mongoose.startSession();
  sess.startTransaction();
  await newEducation.save({session : sess});
  user.education.push(newEducation);
  await user.save({session: sess});
  sess.commitTransaction();

  const userEducation = await Education.find({user : userId}).sort({toDate: 1});

  res.status(200).json({ message: "Education Added", userEducation: userEducation });

};
const getUserEducation = async (req, res, next) =>{
  const {userId} = req.body;

  const userEducation = await Education.find({user : userId}).sort({
    toDate : 1
  });
  res.json({userEducation: userEducation});
};

const getEditEducation = async (req, res, next) =>{
  const {educId} = req.body;

  const getEditEducation = await Education.findById(educId)
  res.json({editData: getEditEducation});
}
const updateEducation = async (req, res ,next) => {
  const {level, school, degree, fromDate, toDate, awards, educId,address, userId} =  req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  let updateEducation = await Education.findByIdAndUpdate(educId,{
    level,
    school,
    degree,
    fromDate,
    toDate,
    awards : awards,
    address
  })

  const newUpdate = await Education.find({user : userId}).sort({
    toDate : 1
  });
  if(updateEducation){
    res.status(201).json({userEducation : newUpdate, message : 'Education Updated'});
  }
  
}
const deleteEducation = async (req, res ,next) => {
  const {educId, userId} = req.body

  const education = await Education.findById(educId);
  const user = await User.findById(userId);
  const sess = await  mongoose.startSession();
  sess.startTransaction();
  await education.remove({session : sess});
  user.education.pull(education);
  await user.save({session: sess});
  sess.commitTransaction();

  const newUpdate = await Education.find({user : userId}).sort({
    toDate : 1
  });
  res.status(201).json({userEducation : newUpdate, message : 'Education Deleted'});
}
exports.signup = signup;
exports.login = login;
exports.getuserData = getuserData;
exports.editBasicInfo = editBasicInfo;
exports.editContactInfo = editContactInfo;
exports.addEducation = addEducation;
exports.getUserEducation = getUserEducation;
exports.getEditEducation = getEditEducation;
exports.updateEducation = updateEducation;
exports.deleteEducation = deleteEducation;
