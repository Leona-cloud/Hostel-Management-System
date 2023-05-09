const express = require('express');
const router = express.Router();
const wardenAuth = require('../middlewares/warden-auth');

const wardenRegister = require('../controllers/wardens/register');
const wardenLogin = require('../controllers/wardens/login');
const wardenRegistrationCompletion = require('../controllers/wardens/complete-registration');

const studentRegister = require('../controllers/students/register')



//WARDEN
router.post('/warden/register', wardenRegister);
router.post('/warden/login', wardenLogin);
router.post('/warden/update-reg', wardenAuth, wardenRegistrationCompletion );


//STUDENT
router.post('/student/register', studentRegister);








module.exports = router