const { validationResult } = require("express-validator");

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
// const acceptPendingUser = async (req, res, next) => {
//   const { userId } = req.body;

//   const user = await User.findByIdAndUpdate(userId, {
//     permission: "accepted",
//   });

//   if (user) {
//     const pendingUsers = await User.find(
//       { permission: "pending" },
//       "-password"
//     );
//     res.json({ pendingUsers: pendingUsers, accept: "accepted" });
//   }
// };

exports.getActiveUsers = getActiveUsers;
exports.getPendingUsers = getPendingUsers;
exports.getRejectedUsers = getRejectedUsers;
exports.getDeactivatedUsers = getDeactivatedUsers;
exports.actionHandler = actionHandler;
// exports.acceptPendingUser = acceptPendingUser;
