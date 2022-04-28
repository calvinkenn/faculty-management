const express = require('express');
const {check} = require('express-validator');
const userControllers = require('../controllers/users-controllers');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();


router.post(
    '/signup',
    [
        check('employeeNum').not().isAlpha().withMessage('Please input numbers only'),
        check('email').normalizeEmail().isEmail().withMessage('please input a valid email!'),
        check('password').isLength({min:6}).withMessage('please input password greater than 6 characters')
    ],
    userControllers.signup
);

router.post('/login', userControllers.login);

router.patch('/editBasicInfo',[
    check('firstName').not().isEmpty().withMessage('First name must not be empty!'),
    check('lastName').not().isEmpty().withMessage('Last name must not be empty!'),
    check('placeofBirth').not().isEmpty().withMessage('Place of Birth must not be empty!'),
    check('gender').not().isEmpty().withMessage('Please choose your gender!'),
    check('civilStatus').not().isEmpty().withMessage('Please choose your Civil Status!'),
    
], checkAuth, userControllers.editBasicInfo);
router.patch('/editContactInfo',[
    check('houseNoR').not().isEmpty().withMessage('Resident House number must not be empty'),
    check('streetR').not().isEmpty().withMessage('Resident Street must not be empty'),
    check('barangayR').not().isEmpty().withMessage('Please choose your Resident Barangay'),
    check('provinceR').not().isEmpty().withMessage('Please choose your Resident Province'),
    check('zipR').not().isEmpty().withMessage('Please type your Resident Zip Code'),
    check('houseNoP').not().isEmpty().withMessage('Permanent House number must not be empty'),
    check('streetP').not().isEmpty().withMessage('Permanent Street must not be empty'),
    check('barangayP').not().isEmpty().withMessage('Please choose your Permanent Barangay'),
    check('provinceP').not().isEmpty().withMessage('Please choose your Permanent Province'),
    check('zipP').not().isEmpty().withMessage('Please type your Permanent Zip Code'),
    check('cellphoneNum').not().isEmpty().withMessage('Cellphone Number must not be empty!'),

], checkAuth, userControllers.editContactInfo);
router.patch('/editAccountInfo',[
    check('employeeNum').not().isEmpty().withMessage('Employee Number must not be empty!'),
    check('email').not().isEmpty().withMessage('Email must not be empty!'),
    check('faculty').not().isEmpty().withMessage('Please choose your faculty'),
    check('employmentType').not().isEmpty().withMessage('Please choose your employment type!'),
],userControllers.editAccountInfo);
router.patch('/userChangePassword',[
    check('oldPassword').not().isEmpty().withMessage('Old password must not be empty!'),
    check('newPassword').not().isEmpty().withMessage('New password must not be empty!'),
    check('confirmNewPassword').not().isEmpty().withMessage('Confirm New password must not be empty!'),
], userControllers.accountChangePassword);
router.post('/userData',checkAuth, userControllers.getuserData);
router.post('/addEducation',[
    check('level').not().isEmpty().withMessage('Please specify your education level!'),
    check('school').not().isEmpty().withMessage('Please specify the school you attended!'),
    check('fromDate').not().isEmpty().withMessage('Please specify your starting date of attendance!'),
    check('toDate').not().isEmpty().withMessage('Please specify your last date of attendance!'),
    check('highestLevel').not().isEmpty().withMessage('Please specify your highest level attained or units earned!'),
], checkAuth, userControllers.addEducation);
router.patch('/updateEducation',[
    check('level').not().isEmpty().withMessage('Please specify your education level!'),
    check('school').not().isEmpty().withMessage('Please specify the school you attended!'),
    check('fromDate').not().isEmpty().withMessage('Please specify your starting date of attendance!'),
    check('toDate').not().isEmpty().withMessage('Please specify your last date of attendance!'),
    check('highestLevel').not().isEmpty().withMessage('Please specify your highest level attained or units earned!'),
],checkAuth, userControllers.updateEducation);
router.delete('/deleteEducation', userControllers.deleteEducation);
router.post('/getUserEducation', userControllers.getUserEducation);
router.post('/getEditEducation', userControllers.getEditEducation);





module.exports = router;