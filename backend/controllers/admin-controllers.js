const { validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");

const User = require("../models/user");
const Admin = require("../models/admin");
const Header = require("../models/header");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  let isValidPassword = false;

  try {
    existingUser = await Admin.findOne({ email: email });
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
  isValidPassword = await Admin.findOne({ password: password });
  if (!isValidPassword) {
    const error = new HttpError("Invalid password, could not log you in.", 401);
    return next(error);
  }

  //sign user with token for authentication
  let token = jwt.sign({ adminId: existingUser.id }, "superidol", {
    expiresIn: "1h",
  });
  return res.json({
    admin: "Logged in!",
    adminId: existingUser.id,
    token: token,
  });
};

const getActiveUsers = async (req, res, next) => {
  const activeUsers = await User.find({ permission: "accepted" }, "-password");

  if (!activeUsers) {
    return res.json({ nousers: "no users found" });
  }
  res.json({ activeUsers: activeUsers });
};

const getPendingUsers = async (req, res, next) => {
  const pendingUsers = await User.find({ permission: "pending" }, "-password");

  if (!pendingUsers) {
    return res.json({ nousers: "no users found" });
  }
  res.json({ pendingUsers: pendingUsers });
};

const getRejectedUsers = async (req, res, next) => {
  const rejectedUsers = await User.find(
    { permission: "rejected" },
    "-password"
  );

  if (!rejectedUsers) {
    return res.json({ nousers: "no rejected users found" });
  }
  res.json({ rejectedUsers: rejectedUsers });
};

const getDeactivatedUsers = async (req, res, next) => {
  const deactivatedUsers = await User.find(
    { permission: "deactivated" },
    "-password"
  );

  if (!deactivatedUsers) {
    return res.json({ nousers: "no deactivated users found" });
  }
  res.json({ deactivatedUsers: deactivatedUsers });
};

const getResetUsers = async (req, res, next) => {
  const resetUsers = await User.find({ permission: "reset" }, "-password");

  if (!resetUsers) {
    return res.json({ nousers: "no users requesting password reset found" });
  }
  res.json({ resetUsers: resetUsers });
};

const getLockedUsers = async (req, res, next) => {
  const lockedUsers = await User.find({ attempts: 3 }, "-password");

  if (!lockedUsers) {
    return res.json({ nousers: "no locked accounts found" });
  }
  res.json({ lockedUsers: lockedUsers });
};

const actionHandler = async (req, res, next) => {
  //All action for buttons
  const { userId, permissionUpdate } = req.body;
  const user = await User.findByIdAndUpdate(userId, {
    permission: permissionUpdate,
  });

  if (user) {
    const pendingUsers = await User.find(
      { permission: "pending" },
      "-password"
    );
    res.json({ pendingUsers: pendingUsers, permission: permissionUpdate });
  }
};

const deactivateAccount = async (req, res, next) => {
  //All action for buttons
  const { userId, permissionUpdate, deactivateNote } = req.body;
  const user = await User.findByIdAndUpdate(userId, {
    permission: permissionUpdate,
    deactivateNote: deactivateNote,
  });

  if (user) {
    const pendingUsers = await User.find(
      { permission: "pending" },
      "-password"
    );
    res.json({ pendingUsers: pendingUsers, permission: permissionUpdate });
  }
};

const unlockAccountHandler = async (req, res, next) => {
  //Unlock Account
  const { userId } = req.body;
  const user = await User.findByIdAndUpdate(userId, {
    attempts: 0,
  });

  if (user) {
    res.json({ user: user, message: "unlocked" });
  }
};

const resetPasswordHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorsList = errors.array();
    const newList = errorsList.map((error) => error.msg);
    const error = new HttpError(newList[0], 422);
    return next(error);
  }
  const { userId, newPass } = req.body;

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(newPass, 12);
  } catch (err) {
    const error = new HttpError(
      "Resetting password failed, try again later.",
      500
    );
    return next(error);
  }

  const user = await User.findByIdAndUpdate(userId, {
    permission: "accepted",
    password: hashedPassword,
  });

  let updatedUser;
  if (user) {
    updatedUser = await User.findById(userId);
  }

  res.status(200).json({
    message:
      "Password resetted, temporary password was sent to the email registered.",
    updatedUser: user,
    permission: "accepted",
  });
};

const getHeader = async (req, res, next) => {
  const headerData = await Header.find();

  if (!headerData) {
    return res.json({ headerData: "no header found" });
  }
  res.json({ headerData: headerData });
};

const editHeaderText = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorsList = errors.array();
    const newList = errorsList.map((error) => error.msg);
    const error = new HttpError(newList[0], 422);
    return next(error);
  }
  const { headerText, id } = req.body;

  let editHeaderText = await Header.findByIdAndUpdate(id, {
    headerText,
  });

  const newUpdate = await Header.find({ id: id });
  if (editHeaderText) {
    res
      .status(201)
      .json({ editHeaderText: newUpdate, message: "Header Text Updated" });
  }
};

const editLogo = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorsList = errors.array();
    const newList = errorsList.map((error) => error.msg);
    const error = new HttpError(newList[0], 422);
    return next(error);
  }
  const { headerText, id } = req.body;
  let edit1 = await Header.findByIdAndUpdate(id, {
    headerImage: req.file.path,
    headerText,
  });

  const newUpdate = await Header.find({ id: id });
  if (edit1) {
    res.status(201).json({ edit1: newUpdate, message: "Header Updated" });
  }
};

exports.login = login;
exports.getActiveUsers = getActiveUsers;
exports.getPendingUsers = getPendingUsers;
exports.getRejectedUsers = getRejectedUsers;
exports.getDeactivatedUsers = getDeactivatedUsers;
exports.getResetUsers = getResetUsers;
exports.getLockedUsers = getLockedUsers;
exports.actionHandler = actionHandler;
exports.deactivateAccount = deactivateAccount;
exports.resetPasswordHandler = resetPasswordHandler;
exports.unlockAccountHandler = unlockAccountHandler;
exports.getHeader = getHeader;
exports.editHeaderText = editHeaderText;
exports.editLogo = editLogo;
// exports.acceptPendingUser = acceptPendingUser;
