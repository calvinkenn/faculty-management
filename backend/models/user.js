const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    employeeNum : {type : Number, required : true, unique: true},
    firstName   : {type : String, required : true},
    lastName    : {type : String, required : true},
    email       : {type : String, required : true},
    password    : {type : String, required : true},
    gender      : {type : String, required : true, default : ''},
    placeofBirth : {type: String, required : true, default : ''},
    civilStatus : {type: String, required : true, default : ''},
    height : {type: String, required : true, default: ''},
    weight : {type: String, required : true, default: ''},
    bloodType : {type: String, required : true, default: ''},
    citizenship : {type : String, required : true , default: ''},
    birthday    : {
        mm      : {type : Number, required : true, default: null},
        dd      : {type : Number, required : true, default: null},
        yyyy    : {type : Number, required : true, default: null},
    },
    permanentAddress : {
        houseNo     : {type: String, required : true, default : ''},
        street      : {type: String, required : true, default : ''},
        barangay    : {type: String, required : true, default : ''},
        province    : {type: String, required : true, default : ''},
        zipcode     : {type: String, required : true, default : ''},
    },
    ResidentAddress : {
        houseNo     : {type: String, required : true, default : ''},
        street      : {type: String, required : true, default : ''},
        barangay    : {type: String, required : true, default : ''},
        province    : {type: String, required : true, default : ''},
        zipcode     : {type: String, required : true, default : ''},
    },
    gssId : {type : String, required : true, default : ''},
    pagibigId : {type : String, required : true, default : ''},
    philHealthId : {type : String, required : true, default : ''},
    sssId : {type : String, required : true, default : ''},
    tinId : {type : String, required : true, default : ''},
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);