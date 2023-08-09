const express = require('express');
const router = express.Router();
const wardenAuth = require('../middlewares/warden-auth');
const studentAuth = require('../middlewares/student-auth');

const createHostel = require('../controllers/hostel/create-hostel');
const createRooms = require('../controllers/hostel/create-rooms');
const fetchHostels = require('../controllers/hostel/fetch-hostels');
const fetchRooms = require('../controllers/hostel/fetch-rooms');
const setupHostel = require('../controllers/students/setup-hostel');
const makePayment = require('../controllers/students/make-payment')
const updateNoticeBoard = require('../controllers/wardens/update-notice-board');
const viewNoticeBoard = require('../controllers/hostel/view-notice-Board');
const addNewRoom = require('../controllers/hostel/add-new-room');
const fetchHostelID = require('../controllers/hostel/fetch-hostelId')
const lodgeComplaints = require('../controllers/students/lodge-complaints');
const fetchStudents = require('../controllers/students/fetch-students');
const VerifyStudent = require('../controllers/wardens/verify-student');
const UpdateStatus = require('../controllers/wardens/update-status');
const viewComplaints = require('../controllers/wardens/view-complaints');
const evictStudent = require('../controllers/wardens/evict-student');
const fetchAStudent = require('../controllers/wardens/fetch-student');
const enrollFingerPrint = require('../controllers/wardens/fingerprint-enroll');
const getFingerPrint = require('../controllers/wardens/get-fingerprint');

router.post('/create', wardenAuth, createHostel);
router.post('/create-rooms', createRooms);
router.post('/fetch-hostels', fetchHostels);
router.post('/fetch-rooms', fetchRooms);
router.post('/setup-hostel', studentAuth, setupHostel);
router.post('/make-payment', studentAuth, makePayment)
router.post('/update-notice-board', wardenAuth, updateNoticeBoard)
router.post('/view-notice-board', studentAuth, viewNoticeBoard)
router.post('/add-new-room', wardenAuth, addNewRoom);
router.post('/fetch-hostelId', fetchHostelID);
router.post('/lodge-complaints', studentAuth, lodgeComplaints);
router.post('/fetch-students', wardenAuth, fetchStudents)
router.post('/verify-certificate', wardenAuth, VerifyStudent)
router.post('/update-status', wardenAuth, UpdateStatus)
router.post('/view-complaints', wardenAuth, viewComplaints)
router.post('/evict-student', wardenAuth, evictStudent)
router.get('/fetch-student', fetchAStudent);
router.post('/enroll-fingerPrint', enrollFingerPrint);
router.post('/get-fingerPrint', getFingerPrint);







module.exports = router;