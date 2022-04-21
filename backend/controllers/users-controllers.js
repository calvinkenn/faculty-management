const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  const errors = validationResult(req);

  //checking for validation errors
  if (!errors.isEmpty()) {
    // errorsList = errors.array();
    // const newList = errorsList.map(error => error.msg);
    // return res.json({error : newList[0]});
    return next(new HttpError("Please fill all the required fields", 422));
  }
  //gather all the data from request
  const { employeeNum, firstName, lastName, email, password } = req.body;

  //check if user exist
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
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
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }
  res.status(201).json({ userId: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser = await User.findOne({ email: email });
  let isValidPassword = false;

  //check if user is existing
  if (!existingUser) {
    const error = new HttpError(
        'Invalid credentials, could not log you in.',
        401
      );
      return next(error);
  }

  //check if hash is correct
  isValidPassword = await bcrypt.compare(password, existingUser.password);
  if (!isValidPassword) {
    const error = new HttpError(
        'Invalid credentials, could not log you in.',
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
    userId: existingUser.toObject({ getters: true }),
    email: existingUser.email,
    token: token,
  });
};

exports.signup = signup;
exports.login = login;
