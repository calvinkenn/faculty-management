const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

const User = require("../models/user");
const Admin = require('../models/admin');
const { findByIdAndUpdate } = require("../models/user");

const getActiveUsers = async (req, res, next) =>{

    const activeUsers = await User.find({permission : 'accepted'}, '-password');

    if(!activeUsers){
        return res.json({nousers : 'no users found'});
    }
    res.json({activeUsers :activeUsers});
};


const getPendingUsers = async (req, res, next) =>{

    const pendingUsers = await User.find({permission : 'pending'}, '-password');

    if(!pendingUsers){
        return res.json({nousers : 'no users found'});
    }
    res.json({pendingUsers :pendingUsers});
};

const rejectPendingUser = async(req,res,next) =>{
    const {userId} = req.body;

    const user = await User.findByIdAndUpdate(userId,{
        permission : 'rejected'
    });

    if(user){
        const pendingUsers = await User.find({permission : 'pending'}, '-password');
        res.json({pendingUsers :pendingUsers, reject : 'rejected'});
    }
}
const acceptPendingUser = async(req,res,next) =>{
    const {userId} = req.body;

    const user = await  User.findByIdAndUpdate(userId,{
        permission : 'accepted'
    });

    if(user){
        const pendingUsers = await User.find({permission : 'pending'}, '-password');
        res.json({pendingUsers :pendingUsers, accept : 'accepted'});
    }
}

exports.getActiveUsers = getActiveUsers;
exports.getPendingUsers = getPendingUsers;
exports.rejectPendingUser = rejectPendingUser;
exports.acceptPendingUser = acceptPendingUser;