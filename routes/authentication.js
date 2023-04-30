const express = require('express');
const router = express.Router();

const wardenRegister = require('../controllers/wardens/register');




//register
router.post('/warden/register', wardenRegister);








module.exports = router