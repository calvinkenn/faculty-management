const express = require("express");
const { check } = require("express-validator");
const announcementUpload = require("../middleware/file-upload");
const announcementControllers = require("../controllers/announcement-controllers");
const router = express.Router();

router.get("/getAnnouncements", announcementControllers.getAnnouncements);
router.post(
  "/addNewAnnouncement",
  announcementUpload.single("announcementPic"),
  announcementControllers.addNewAnnouncement
);
router.delete(
  "/deleteAnnouncement",
  announcementControllers.deleteAnnouncement
);
router.patch("/editAnnouncement", announcementControllers.editAnnouncement);

router.patch(
  "/clearAnnouncementCount",
  announcementControllers.clearAnnouncementCount
);

module.exports = router;
