const express = require('express');
const router = express.Router();
const wardenAuth = require('../middlewares/warden-auth');

const createHostel = require('../controllers/hostel/create-hostel');
const createRooms = require('../controllers/hostel/create-rooms');
const fetchHostels = require('../controllers/hostel/fetch-hostels');
const fetchRooms = require('../controllers/hostel/fetch-rooms');



router.post('/create', wardenAuth, createHostel);
router.post('/create-rooms', createRooms);
router.get('/fetch-hostels', wardenAuth, fetchHostels);
router.get('/fetch-rooms', fetchRooms);










module.exports = router;