const { validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");

const HttpError = require("../models/http-error");

const User = require("../models/user");
const Admin = require("../models/admin");
const { findByIdAndUpdate } = require("../models/user");

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
    message: "Password is now: Last name(lower case) + Employee Number",
    updatedUser: user,
    permission: "accepted",
  });
};

exports.getActiveUsers = getActiveUsers;
exports.getPendingUsers = getPendingUsers;
exports.getRejectedUsers = getRejectedUsers;
exports.getDeactivatedUsers = getDeactivatedUsers;
exports.getResetUsers = getResetUsers;
exports.actionHandler = actionHandler;
exports.resetPasswordHandler = resetPasswordHandler;
// exports.acceptPendingUser = acceptPendingUser;
