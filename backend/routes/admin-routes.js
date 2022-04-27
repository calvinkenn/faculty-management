const express = require('express');
const {check} = require('express-validator');
const adminControllers = require('../controllers/admin-controllers');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

router.get('/getAllActiveUsers' ,adminControllers.getActiveUsers);
router.get('/getAllPendingUsers' ,adminControllers.getPendingUsers);
router.patch('/rejectPendingUser', adminControllers.rejectPendingUser);
router.patch('/acceptPendingUser', adminControllers.acceptPendingUser);



module.exports = router;