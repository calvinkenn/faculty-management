const { validationResult } = require('express-validator');


const User = require('../models/user');

const signup = async (req, res, next) => {
    const errors = validationResult(req);

    //checking for validation errors
    if(!errors.isEmpty()){
        errorsList = errors.array();
        const newList = errorsList.map(error => error.msg);
        return res.json({error : newList});
    }
    //gather all the data from request
    const {employeeNum, firstName, lastName, email, password} = req.body;

    //check if user exist
    let existingUser;
    try{
        existingUser = await User.findOne({email : email});
    }catch(err){
        return res.json({error: "Signing Up failed, please try again later"});
    }
    //if user exist do something
    if(existingUser){
        return res.json({error: "User Already Exist!"});
    }
    //if not create a new user
    const createdUser = new User({
        employeeNum,
        firstName,
        lastName,
        email,
        password,
    });
    
    try {
        await createdUser.save();
    }catch(err){
       return res.json({error: err});
    }
    res.status(201).json({success :"Sign Up sucess!"});
};

exports.signup = signup;