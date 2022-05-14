const mongoose = require("mongoose");

const announcementSchema = mongoose.Schema({
  title: { type: String },
  author: { type: String },
  content: { type: String },
  image: { type: String },
  date: { type: Date },
  editDate: { type: Date },
});

module.exports = mongoose.model("Announcement", announcementSchema);
