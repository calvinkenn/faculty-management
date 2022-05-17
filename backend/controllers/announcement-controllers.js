const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const { default: mongoose } = require("mongoose");
const Announcement = require("../models/announcement");
const User = require("../models/user");

const getAnnouncements = async (req, res, next) => {
  const announcement = await Announcement.find();

  if (!announcement) {
    return res.json({ announcement: "not found" });
  }
  res.json({ announcement: announcement });
};

const addNewAnnouncement = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorsList = errors.array();
    const newList = errorsList.map((error) => error.msg);
    const error = new HttpError(newList[0], 422);
    return next(error);
  }
  const { title, author, content } = req.body;

  //if not create a new user
  const createdAnnouncement = new Announcement({
    title,
    author,
    content,
    image: req.file.path,
    date: new Date(),
  });

  try {
    const activeUsers = await User.find(
      { permission: "accepted" },
      "-password"
    );

    const updateAnnouncement = await User.updateMany(
      { permission: "accepted" },
      { $inc: { announcementCount: 1 } }
    );

    if (updateAnnouncement) {
      console.log("Added to notif");
    }

    await createdAnnouncement.save();
  } catch (err) {
    console.log(err.message);
    const error = new HttpError(
      err.message || "Creating Announcement Failed",
      500
    );
    return next(error);
  }
  res.status(201).json({
    message: "New Announcement Added",
  });
};

const deleteAnnouncement = async (req, res, next) => {
  const { announcementID } = req.body;

  const announcement = Announcement.deleteOne({ _id: announcementID });

  Promise.all([announcement])
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Announcement Deleted",
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err,
      });
    });
};

const editAnnouncement = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorsList = errors.array();
    const newList = errorsList.map((error) => error.msg);
    const error = new HttpError(newList[0], 422);
    return next(error);
  }
  const { title, author, content, id } = req.body;

  let editAnnouncement = await Announcement.findByIdAndUpdate(id, {
    title,
    author,
    content,
    editDate: new Date(),
  });

  const newUpdate = await Announcement.find({ id: id });
  if (editAnnouncement) {
    res
      .status(201)
      .json({ announcement: newUpdate, message: "Announcement Updated" });
  }
};

const clearAnnouncementCount = async (req, res, next) => {
  //All action for buttons
  const { userId } = req.body;
  const user = await User.findByIdAndUpdate(userId, {
    announcementCount: 0,
  });
};

exports.getAnnouncements = getAnnouncements;
exports.addNewAnnouncement = addNewAnnouncement;
exports.deleteAnnouncement = deleteAnnouncement;
exports.editAnnouncement = editAnnouncement;
exports.clearAnnouncementCount = clearAnnouncementCount;
