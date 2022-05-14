const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const { default: mongoose } = require("mongoose");
const Announcement = require("../models/announcement");

const getAnnouncements = async (req, res, next) => {
  const announcement = await Announcement.find().exec();

  if (!announcement) {
    return res.json({ announcement: "not found" });
  }
  res.json({ announcement: announcement });
};

exports.getAnnouncements = getAnnouncements;
