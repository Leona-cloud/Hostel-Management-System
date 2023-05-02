const express = require('express');
const router = express.Router();

const wardenRegister = require('../controllers/wardens/register');
const wardenLogin = require('../controllers/wardens/login');




//WARDEN
router.post('/warden/register', wardenRegister);
router.post('/warden/login', wardenLogin);








module.exports = router