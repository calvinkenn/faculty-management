const express = require('express');
const {check} = require('express-validator');
const userControllers = require('../controllers/users-controllers');
const router = express.Router();


router.post(
    '/signup',
    [
        check('employeeNum').not().isAlpha().withMessage('Please input numbers only'),
        check('email').normalizeEmail().isEmail().withMessage('please input a valid email!'),
        check('password').isLength({min:8}).withMessage('please input password greater than 8 characters')
    ],
    userControllers.signup
);
router.post('/login');



module.exports = router;