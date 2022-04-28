const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const educationSchema = mongoose.Schema({
    level : {type :String , required : true},
    school : {type : String , required :true},
    degree : {type : String,},
    fromDate : {type : String, required : true},
    toDate : {type : String, required : true},
    awards: [{type : Object}],
    user : {type : mongoose.Types.ObjectId, required: true, ref : 'User'},
    yearGraduated : {type : String, default : ""},
    highestLevel : {type : String, required : true},
});

module.exports = mongoose.model("Education", educationSchema);