const express = require("express");
const { check } = require("express-validator");
const announcementControllers = require("../controllers/announcement-controllers");
const router = express.Router();

router.get("/getAnnouncements", announcementControllers.getAnnouncements);

module.exports = router;
