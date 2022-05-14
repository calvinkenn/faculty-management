const express = require("express");
const { check } = require("express-validator");
const adminControllers = require("../controllers/admin-controllers");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

router.post("/login", adminControllers.login);
router.get("/getAllActiveUsers", adminControllers.getActiveUsers);
router.get("/getAllPendingUsers", adminControllers.getPendingUsers);
router.get("/getAllRejectedUsers", adminControllers.getRejectedUsers);
router.get("/getAllDeactivatedUsers", adminControllers.getDeactivatedUsers);
router.get("/getAllResetUsers", adminControllers.getResetUsers);
router.get("/getAllLockedUsers", adminControllers.getLockedUsers);
router.patch("/actionHandler", adminControllers.actionHandler);
router.patch("/resetPasswordHandler", adminControllers.resetPasswordHandler);
router.patch("/unlockAccountHandler", adminControllers.unlockAccountHandler);
// router.patch("/acceptPendingUser", adminControllers.acceptPendingUser);

module.exports = router;
