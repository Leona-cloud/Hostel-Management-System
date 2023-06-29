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


router.post('/create', wardenAuth, createHostel);
router.post('/create-rooms', createRooms);
router.get('/fetch-hostels', wardenAuth, fetchHostels);
router.get('/fetch-rooms', fetchRooms);
router.post('/setup-hostel', studentAuth, setupHostel);
router.post('/make-payment', studentAuth, makePayment)










module.exports = router;