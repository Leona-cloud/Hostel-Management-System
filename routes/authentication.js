const express = require('express');
const multer = require('multer')
const storage = require('../utils/multer')
var upload = multer({storage: storage })
const router = express.Router();
const wardenAuth = require('../middlewares/warden-auth');
const studentAuth = require('../middlewares/student-auth');

const wardenRegister = require('../controllers/wardens/register');
const wardenLogin = require('../controllers/wardens/login');
const studentRegister = require('../controllers/students/register');
const completeStudentRegistration = require('../controllers/students/complete-registration');
const studentLogin = require('../controllers/students/login');
const uploadPicture = require('../controllers/students/uploadPicture');
const uploadCertificate = require('../controllers/students/uploadCertificate');
const dsaRegister = require('../controllers/wardens/dsa-register');
const dsaLogin = require('../controllers/wardens/dsa-login');



//WARDEN
router.post('/warden/register', wardenRegister);
router.post('/warden/login', wardenLogin);
router.post('/dsa/register', dsaRegister)
router.post('/dsa/login', dsaLogin)


//STUDENT
router.post('/student/register', studentRegister);
router.post('/student/update-details', studentAuth, completeStudentRegistration);
router.post('/student/login', studentLogin);
router.post('/student/upload-image', [studentAuth, upload.single('file')], uploadPicture)
router.post('/student/upload-certificate', studentAuth, uploadCertificate);









module.exports = router