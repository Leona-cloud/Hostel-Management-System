const express = require('express');
const router = express.Router();
const wardenAuth = require('../middlewares/warden-auth');

const createHostel = require('../controllers/hostel/create-hostel')



router.post('/create', wardenAuth, createHostel);











module.exports = router;