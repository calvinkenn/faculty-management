const express = require("express");
const { check } = require("express-validator");
const adminControllers = require("../controllers/admin-controllers");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
const headerUpload = require("../middleware/file-upload");
const headerUpload2 = require("../middleware/file-upload");

router.post("/login", adminControllers.login);
router.get("/getAllActiveUsers", adminControllers.getActiveUsers);
router.get("/getAllPendingUsers", adminControllers.getPendingUsers);
router.get("/getAllRejectedUsers", adminControllers.getRejectedUsers);
router.get("/getAllDeactivatedUsers", adminControllers.getDeactivatedUsers);
router.get("/getAllResetUsers", adminControllers.getResetUsers);
router.get("/getAllLockedUsers", adminControllers.getLockedUsers);
router.patch("/actionHandler", adminControllers.actionHandler);
router.patch("/deactivateAccount", adminControllers.deactivateAccount);
router.patch("/resetPasswordHandler", adminControllers.resetPasswordHandler);
router.patch("/unlockAccountHandler", adminControllers.unlockAccountHandler);
router.get("/getHeader", adminControllers.getHeader);
router.patch("/editHeaderText", adminControllers.editHeaderText);
router.patch(
  "/editLogo",
  headerUpload.single("headerImage"),
  adminControllers.editLogo
);
// router.patch("/acceptPendingUser", adminControllers.acceptPendingUser);

module.exports = router;
