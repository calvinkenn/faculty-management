const mongoose = require("mongoose");

const headerSchema = mongoose.Schema({
  headerText: {
    type: String,
    default:
      "Bulacan State University is a progressive knowledge-generating institution globally recognized for excellent instruction, pioneering research, and responsive community engagements.",
  },
  headerImage: {
    type: String,
  },
});

module.exports = mongoose.model("Header", headerSchema);
