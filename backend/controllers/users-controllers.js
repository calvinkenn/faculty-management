const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Admin = require("../models/admin");
const Education = require("../models/education");
const Civil = require("../models/civil");
const Work = require("../models/workexperience");
const Training = require("../models/training");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const { findById } = require("../models/user");

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

  let existingEmployeeNumber = await User.findOne({ employeeNum: employeeNum });

  if (existingEmployeeNumber) {
    const error = new HttpError(
      "Employee number already exists, if you havent registered this employee number yet. Please contact administrator immediatley!",
      422
    );
    return next(error);
  }
  try {
    existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      existingUser = await Admin.findOne({ username: email });
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
    dateOfRegistration: new Date(),
    attempts: 0,
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

const reset = async (req, res, next) => {
  const { email } = req.body;

  try {
    existingUser =
      (await User.findOne({ email: email })) ||
      (await User.findOne({ alternateEmail: email }));
  } catch (err) {
    const error = new HttpError("Email is not registered.", 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError("Email is not registered.", 401);
    return next(error);
  }

  const user = await User.findByIdAndUpdate(existingUser._id, {
    permission: "reset",
  });

  let updatedUser;
  if (user) {
    updatedUser = await User.findById(existingUser.userId);
  }
  res
    .status(200)
    .json({ message: "Reset Password Requested", updatedUser: updatedUser });
};

const isNumeric = (str) => {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  let isValidPassword = false;

  if (isNumeric(email)) {
    try {
      existingUser = await User.findOne({
        $or: [
          // { email: email },
          // { alternateEmail: email },
          { employeeNum: email },
        ],
      });
    } catch (err) {
      const error = new HttpError(
        "Email/Employee Number is not registered.",
        500
      );
      return next(error);
    }
  } else {
    //check if user is existing
    try {
      existingUser = await User.findOne({
        $or: [
          { email: email },
          { alternateEmail: email },
          // { employeeNum: email },
        ],
      });
    } catch (err) {
      const error = new HttpError(
        "Email/Employee Number is not registered.",
        500
      );
      return next(error);
    }
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }

  if (existingUser.permission === "reset") {
    const error = new HttpError(
      "Account requested for a reset. Please wait for the admin to reset your password and try again.",
      401
    );
    return next(error);
  }

  if (existingUser.attempts >= 3) {
    const error = new HttpError(
      "Account reached the maximum attempt for login. Please contact the admin to unlock your account",
      401
    );
    return next(error);
  }

  //check if hash is correct
  isValidPassword = await bcrypt.compare(password, existingUser.password);
  if (!isValidPassword) {
    if (existingUser.attempts >= 0) {
      let editVision = await User.findByIdAndUpdate(existingUser.id, {
        attempts: existingUser.attempts + 1,
      });
      if (editVision) {
        const error = new HttpError(
          "Invalid credentials, could not log you in. " +
            `${
              2 - existingUser.attempts <= 1
                ? 2 - existingUser.attempts + " attempt remaining"
                : 2 - existingUser.attempts + " attempts remaining"
            }`,
          401
        );
        return next(error);
      }
    }
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }

  if (existingUser.permission === "pending") {
    const error = new HttpError(
      "Account not verified yet, please wait for admin to verify your account.",
      401
    );
    return next(error);
  } else if (existingUser.permission === "deactivated") {
    const error = new HttpError(
      "Account access deactivated. if you think this was a mistake, please contact admin immediately.",
      401
    );
    return next(error);
  } else if (existingUser.permission === "rejected") {
    const error = new HttpError(
      "Account access rejected. if you think this was a mistake, please contact admin immediately.",
      401
    );
    return next(error);
  }

  if (existingUser.attempts >= 0) {
    let editVision = await User.findByIdAndUpdate(existingUser.id, {
      attempts: 0,
    });
    if (editVision) {
      let token = jwt.sign(
        { userId: existingUser.id, email: email },
        "superidol",
        {
          expiresIn: "1h",
        }
      );
      res.json({
        message: "Logged in!",
        userId: existingUser.id,
        email: existingUser.email,
        token: token,
      });
    }
  } else {
    //sign user with token for authentication
    let token = jwt.sign(
      { userId: existingUser.id, email: email },
      "superidol",
      {
        expiresIn: "1h",
      }
    );
    res.json({
      message: "Logged in!",
      userId: existingUser.id,
      email: existingUser.email,
      token: token,
    });
  }
};

const getuserData = async (req, res, next) => {
  const { userId } = req.body;
  const user = await User.findById(userId, "-password");
  res.json({ userData: user });
};

const editBasicInfo = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorsList = errors.array();
    const newList = errorsList.map((error) => error.msg);
    const error = new HttpError(newList[0], 422);
    return next(error);
  }
  const {
    userId,
    firstName,
    lastName,
    middleName,
    suffixName,
    // extensionName,
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
    suffixName,
    // extensionName: extensionName,
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
    errorsList = errors.array();
    const newList = errorsList.map((error) => error.msg);
    const error = new HttpError(newList[0], 422);
    return next(error);
  }
  const {
    userId,
    isSameAddress,
    houseNoP,
    streetP,
    locationTypeP,
    regionP,
    provinceP,
    cityP,
    barangayP,
    zipP,
    houseNoR,
    streetR,
    locationTypeR,
    regionR,
    provinceR,
    cityR,
    barangayR,
    zipR,
    telephoneNum,
    cellphoneNum,
    alternateEmail,
  } = req.body;

  const user = await User.findByIdAndUpdate(userId, {
    isSameAddress,
    houseNoP,
    streetP,
    locationTypeP,
    regionP,
    provinceP,
    cityP,
    barangayP,
    zipP,
    houseNoR,
    streetR,
    locationTypeR,
    regionR,
    provinceR,
    cityR,
    barangayR,
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

const editAccountInfo = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorsList = errors.array();
    const newList = errorsList.map((error) => error.msg);
    const error = new HttpError(newList[0], 422);
    return next(error);
  }

  const { userId, employeeNum, faculty, employmentType, email } = req.body;

  const emailValidate = await User.findOne({ email: email });

  if (emailValidate.id === userId) {
    const user = await User.findByIdAndUpdate(userId, {
      employeeNum,
      faculty,
      employmentType,
      email,
    });
    let updatedUser;
    if (user) {
      updatedUser = await User.findById(userId);
    }
    res
      .status(200)
      .json({ message: "Update Success", updatedUser: updatedUser });
  } else {
    const error = new HttpError(
      "Email is already registered to another account!",
      401
    );
    return next(error);
  }
};

//Profile Photo
const changeProfilePhoto = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorsList = errors.array();
    const newList = errorsList.map((error) => error.msg);
    const error = new HttpError(newList[0], 422);
    return next(error);
  }

  const { userId } = req.body;

  const user = await User.findByIdAndUpdate(userId, {
    profilePic: req.file.path,
  });

  let updatedUser;
  if (user) {
    updatedUser = await User.findById(userId);
  }
  res.status(200).json({ message: "Update Success", updatedUser: updatedUser });
};

const accountChangePassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorsList = errors.array();
    const newList = errorsList.map((error) => error.msg);
    const error = new HttpError(newList[0], 422);
    return next(error);
  }
  const { userId, oldPassword, newPassword, confirmNewPassword } = req.body;

  const userPass = await User.findById(userId);
  //hash user password for added website security
  isValidPassword = await bcrypt.compare(oldPassword, userPass.password);
  if (!isValidPassword) {
    const error = new HttpError("Old password does not match!", 401);
    return next(error);
  }
  if (newPassword !== confirmNewPassword) {
    const error = new HttpError("New passwords does not match!", 401);
    return next(error);
  }
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(confirmNewPassword, 12);
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }
  const user = await User.findByIdAndUpdate(userId, {
    password: hashedPassword,
  });
  res
    .status(200)
    .json({ message: "Password Changed Successfully", updatedUser: user });
};

const addEducation = async (req, res, next) => {
  const {
    sorting,
    level,
    school,
    degree,
    fromDate,
    toDate,
    awards,
    userId,
    yearGraduated,
    highestLevel,
  } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorsList = errors.array();
    const newList = errorsList.map((error) => error.msg);
    const error = new HttpError(newList[0], 422);
    return next(error);
  }
  let user = await User.findById(userId);

  const newEducation = new Education({
    sorting,
    level,
    school,
    degree,
    fromDate,
    toDate,
    awards: awards,
    yearGraduated,
    highestLevel,
    user: userId,
  });
  const sess = await mongoose.startSession();
  sess.startTransaction();
  await newEducation.save({ session: sess });
  user.education.push(newEducation);
  await user.save({ session: sess });
  sess.commitTransaction();

  const userEducation = await Education.find({ user: userId }).sort({
    toDate: 1,
  });

  res
    .status(200)
    .json({ message: "Education Added", userEducation: userEducation });
};
const getUserEducation = async (req, res, next) => {
  const { userId } = req.body;

  const userEducation = await Education.find({ user: userId }).sort({
    toDate: 1,
  });
  res.json({ userEducation: userEducation });
};

const getEditEducation = async (req, res, next) => {
  const { educId } = req.body;

  const getEditEducation = await Education.findById(educId);
  res.json({ editData: getEditEducation });
};
const updateEducation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorsList = errors.array();
    const newList = errorsList.map((error) => error.msg);
    const error = new HttpError(newList[0], 422);
    return next(error);
  }

  const {
    sorting,
    level,
    school,
    degree,
    fromDate,
    toDate,
    awards,
    educId,
    yearGraduated,
    highestLevel,
    userId,
  } = req.body;

  let updateEducation = await Education.findByIdAndUpdate(educId, {
    sorting,
    level,
    school,
    degree,
    fromDate,
    toDate,
    awards: awards,
    yearGraduated,
    highestLevel,
  });

  const newUpdate = await Education.find({ user: userId }).sort({
    toDate: 1,
  });
  if (updateEducation) {
    res
      .status(201)
      .json({ userEducation: newUpdate, message: "Education Updated" });
  }
};
const deleteEducation = async (req, res, next) => {
  const { educId, userId } = req.body;

  const education = await Education.findById(educId);
  const user = await User.findById(userId);
  const sess = await mongoose.startSession();
  sess.startTransaction();
  await education.remove({ session: sess });
  user.education.pull(education);
  await user.save({ session: sess });
  sess.commitTransaction();

  const newUpdate = await Education.find({ user: userId }).sort({
    toDate: 1,
  });
  res
    .status(201)
    .json({ userEducation: newUpdate, message: "Education Deleted" });
};

const getUserCivil = async (req, res, next) => {
  const { userId } = req.body;
  const userCivil = await Civil.find({ user: userId });
  res.json({ userCivil: userCivil });
};
const addUserCivil = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorsList = errors.array();
    const newList = errorsList.map((error) => error.msg);
    const error = new HttpError(newList[0], 422);
    return next(error);
  }
  const {
    career,
    rating,
    date,
    placeOfExam,
    licenseNumber,
    licenseValidity,
    userId,
  } = req.body;

  let user = await User.findById(userId);

  const newCivil = new Civil({
    career,
    rating,
    date,
    placeOfExam,
    licenseNumber,
    licenseValidity,
    user: userId,
  });
  const sess = await mongoose.startSession();
  sess.startTransaction();
  await newCivil.save({ session: sess });
  user.civil.push(newCivil);
  await user.save({ session: sess });
  sess.commitTransaction();

  const userCivil = await Civil.find({ user: userId });

  res
    .status(200)
    .json({ message: "Civil Service Added", userCivil: userCivil });
};
const getEditCivil = async (req, res, next) => {
  const { civilId } = req.body;

  const getEditCivil = await Civil.findById(civilId);
  res.json({ editData: getEditCivil });
};
const editCivil = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorsList = errors.array();
    const newList = errorsList.map((error) => error.msg);
    const error = new HttpError(newList[0], 422);
    return next(error);
  }
  const {
    career,
    rating,
    date,
    placeOfExam,
    licenseNumber,
    licenseValidity,
    userId,
    civilId,
  } = req.body;

  let editCivil = await Civil.findByIdAndUpdate(civilId, {
    career,
    rating,
    date,
    placeOfExam,
    licenseNumber,
    licenseValidity,
  });

  const newUpdate = await Civil.find({ user: userId });
  if (editCivil) {
    res
      .status(201)
      .json({ userCivil: newUpdate, message: "Civil Service Updated" });
  }
};
const deleteCivil = async (req, res, next) => {
  const { civilId, userId } = req.body;

  const civil = await Civil.findById(civilId);
  const user = await User.findById(userId);
  const sess = await mongoose.startSession();
  sess.startTransaction();
  await civil.remove({ session: sess });
  user.civil.pull(civil);
  await user.save({ session: sess });
  sess.commitTransaction();

  const newUpdate = await Civil.find({ user: userId });
  res
    .status(201)
    .json({ userCivil: newUpdate, message: "Civil Service Deleted" });
};

const getWorkExperience = async (req, res, next) => {
  const { userId } = req.body;
  const userWork = await Work.find({ user: userId });
  res.json({ WorkExperience: userWork });
};
const getEditWorkExperience = async (req, res, next) => {
  const { workId } = req.body;

  const getEditWork = await Work.findById(workId);
  res.json({ editData: getEditWork });
};
const EditWorkExperience = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorsList = errors.array();
    const newList = errorsList.map((error) => error.msg);
    const error = new HttpError(newList[0], 422);
    return next(error);
  }
  const {
    company,
    position,
    department,
    statusOfAppointment,
    fromDate,
    toDate,
    monthlySalary,
    salaryGrade,
    salaryStep,
    government,
    userId,
    workId,
  } = req.body;

  let editWork = await Work.findByIdAndUpdate(workId, {
    company,
    position,
    department,
    statusOfAppointment,
    fromDate,
    toDate,
    monthlySalary,
    salaryGrade,
    salaryStep,
    government,
  });

  const newUpdate = await Work.find({ user: userId });
  if (editWork) {
    res
      .status(201)
      .json({ userWork: newUpdate, message: "Work Experience Updated" });
  }
};
const addWorkExperience = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorsList = errors.array();
    const newList = errorsList.map((error) => error.msg);
    const error = new HttpError(newList[0], 422);
    return next(error);
  }
  const {
    company,
    position,
    department,
    fromDate,
    statusOfAppointment,
    toDate,
    monthlySalary,
    salaryGrade,
    salaryStep,
    government,
    userId,
  } = req.body;
  let user = await User.findById(userId);

  const newWork = new Work({
    company,
    position,
    department,
    statusOfAppointment,
    fromDate,
    toDate,
    monthlySalary,
    salaryGrade,
    salaryStep,
    government,
    user: userId,
  });
  const sess = await mongoose.startSession();
  sess.startTransaction();
  await newWork.save({ session: sess });
  user.work.push(newWork);
  await user.save({ session: sess });
  sess.commitTransaction();

  const WorkExperience = await Work.find({ user: userId }).sort({
    toDate: 1,
  });

  res
    .status(200)
    .json({ message: "Work Added", WorkExperience: WorkExperience });
};
const deleteWorkExperience = async (req, res, next) => {
  const { workId, userId } = req.body;

  const work = await Work.findById(workId);
  const user = await User.findById(userId);
  const sess = await mongoose.startSession();
  sess.startTransaction();
  await work.remove({ session: sess });
  user.work.pull(work);
  await user.save({ session: sess });
  sess.commitTransaction();

  const newUpdate = await Work.find({ user: userId });
  res
    .status(201)
    .json({ WorkExperience: newUpdate, message: "Work Experience Deleted" });
};

const getUserTraining = async (req, res, next) => {
  const { userId } = req.body;
  const userWork = await Training.find({ user: userId });
  res.json({ userTraining: userWork });
};
const addUserTraining = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorsList = errors.array();
    const newList = errorsList.map((error) => error.msg);
    const error = new HttpError(newList[0], 422);
    return next(error);
  }
  const {
    title,
    type,
    fromDate,
    toDate,
    hours,
    typeOfLearning,
    conducted,
    userId,
  } = req.body;
  let user = await User.findById(userId);

  const newTraining = new Training({
    title,
    type,
    fromDate,
    toDate,
    hours,
    typeOfLearning,
    conducted,
    certificatePic: req.file.path,
    user: userId,
  });
  const sess = await mongoose.startSession();
  sess.startTransaction();
  await newTraining.save({ session: sess });
  user.training.push(newTraining);
  await user.save({ session: sess });
  sess.commitTransaction();

  const userTraining = await Training.find({ user: userId }).sort({
    toDate: 1,
  });

  res
    .status(200)
    .json({ message: "Training/Seminar Added!", userTraining: userTraining });
};
const getEditTraining = async (req, res, next) => {
  const { trainingId } = req.body;

  const getEditTraining = await Training.findById(trainingId);
  res.json({ editData: getEditTraining });
};
const editUserTraining = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorsList = errors.array();
    const newList = errorsList.map((error) => error.msg);
    const error = new HttpError(newList[0], 422);
    return next(error);
  }
  const {
    title,
    type,
    fromDate,
    toDate,
    hours,
    typeOfLearning,
    conducted,
    token,
    userId,
    trainingId,
  } = req.body;

  let editTraining = await Training.findByIdAndUpdate(trainingId, {
    title,
    type,
    fromDate,
    toDate,
    hours,
    typeOfLearning,
    conducted,
  });

  const newUpdate = await Training.find({ user: userId });
  if (editTraining) {
    res
      .status(201)
      .json({ userTraining: newUpdate, message: "Training/Seminar Updated" });
  }
};
const deleteUserTraining = async (req, res, next) => {
  const { trainingId, userId } = req.body;

  const training = await Training.findById(trainingId);
  const user = await User.findById(userId);
  const sess = await mongoose.startSession();
  sess.startTransaction();
  await training.remove({ session: sess });
  user.training.pull(training);
  await user.save({ session: sess });
  sess.commitTransaction();

  const newUpdate = await Training.find({ user: userId });
  res
    .status(201)
    .json({ userTraining: newUpdate, message: "Training/Seminar Deleted" });
};
exports.signup = signup;
exports.reset = reset;
exports.login = login;
exports.getuserData = getuserData;
exports.editBasicInfo = editBasicInfo;
exports.editContactInfo = editContactInfo;
exports.addEducation = addEducation;
exports.getUserEducation = getUserEducation;
exports.getEditEducation = getEditEducation;
exports.updateEducation = updateEducation;
exports.deleteEducation = deleteEducation;
exports.editAccountInfo = editAccountInfo;
exports.accountChangePassword = accountChangePassword;
exports.getUserCivil = getUserCivil;
exports.addUserCivil = addUserCivil;
exports.deleteCivil = deleteCivil;
exports.editCivil = editCivil;
exports.getEditCivil = getEditCivil;

//for profile photochangeProfilePhoto
exports.changeProfilePhoto = changeProfilePhoto;

//for work experience
exports.getWorkExperience = getWorkExperience;
exports.addWorkExperience = addWorkExperience;
exports.deleteWorkExperience = deleteWorkExperience;
exports.getEditWorkExperience = getEditWorkExperience;
exports.EditWorkExperience = EditWorkExperience;

//for training
exports.getUserTraining = getUserTraining;
exports.addUserTraining = addUserTraining;
exports.deleteUserTraining = deleteUserTraining;
exports.getEditTraining = getEditTraining;
exports.editUserTraining = editUserTraining;
