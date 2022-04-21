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
router.post('/userData', userControllers.getuserData);
router.use(checkAuth);





module.exports = router;