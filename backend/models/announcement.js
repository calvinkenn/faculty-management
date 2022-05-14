const mongoose = require("mongoose");

const announcementSchema = mongoose.Schema({
  title: { type: String, default: "" },
  author: { type: String, default: "" },
  content: { type: String, default: "" },
  date: { type: Date, default: "" },
});

module.exports = mongoose.model("Announcement", announcementSchema);
