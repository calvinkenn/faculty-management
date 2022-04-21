const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
    const errors = validationResult(req);

    //checking for validation errors
    if(!errors.isEmpty()){
        errorsList = errors.array();
        const newList = errorsList.map(error => error.msg);
        return res.json({error : newList[0]});
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
    //hash user password for added website security
    let hashedPassword;
    try{
        hashedPassword = await bcrypt.hash(password, 12);
    }catch(err){
        return res.json({error: "Signing up Failed please try again"});
    }
        
    
    
    //if not create a new user
    const createdUser = new User({
        employeeNum,
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });
    
    try {
        await createdUser.save();
    }catch(err){
       return res.json({error: err});
    }
    res.status(201).json({success :"Sign Up sucess!"});
};

const login =  async (req, res ,next) =>{
    const {email,password} = req.body;


    let existingUser = await User.findOne({email : email});
    let isValidPassword = false;

    //check if user is existing
    if(!existingUser){
        return res.status(422).json({error: 'Invalid User Credentials'});
    }

    //check if hash is correct
    isValidPassword = await bcrypt.compare(password, existingUser.password);
    if(!isValidPassword){
        return res.status(422).json({error: 'Invalid User Credentials'});
    }

    //sign user with token for authentication
    let token = jwt.sign(
        {userId : existingUser.id, email : email},
        'superidol',
        {expiresIn : '1h'}
    );
    res.json({
        userId : existingUser.id,
        email : existingUser.email,
        token : token
    });
};
const getuserData = async (req, res, next) =>{
    const {userId} = req.body;
    const user = await User.findOne({id : userId}, '-password')
    res.json({userData: user});
}
exports.signup = signup;
exports.login = login;
exports.getuserData = getuserData;