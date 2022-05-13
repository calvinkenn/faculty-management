const mongoose = require("mongoose");

const vmgoSchema = mongoose.Schema({
  mission: {
    type: String,
    default:
      "Bulacan State University is a progressive knowledge-generating institution globally recognized for excellent instruction, pioneering research, and responsive community engagements.",
  },
  vision: {
    type: String,
    default:
      "Bulacan State University exists to provide highly competent, ethical and service-oriented professionals that contribute to the sustainable socio-economic growth and development of the nation.",
  },
  goals: [{ type: Object }],
  bsitObjectives: [{ type: Object }],
  blisObjectives: [{ type: Object }],
});

module.exports = mongoose.model("VMGO", vmgoSchema);
