const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const trainingSchema = mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    fromDate: { type: String, required: true },
    toDate: { type: String, required: true },
    hours: { type: String, required: true },
    typeOfLearning: { type: String, required: true },
    conducted: { type: String, required: true },
    user : {type : mongoose.Types.ObjectId, required: true, ref : 'User'},
});

module.exports = mongoose.model("Training", trainingSchema);