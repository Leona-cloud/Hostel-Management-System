const express = require('express');
const router = express.Router();

const paystackWebhook = require('../webhooks/paystack');
const wardenAuth = require('../middlewares/warden-auth');
const verifyPayment = require('../controllers/wardens/verify-payment');
const generateReport = require('../controllers/wardens/generate-report');
const DsaAuth = require('../middlewares/dsa-auth');
const fetchEvictedStudents = require('../controllers/wardens/fetch-evicted-students');



router.post('/paystack-webhook', paystackWebhook);
router.post('/verify-payment', wardenAuth, verifyPayment)
router.post('/generate-report', DsaAuth ,generateReport)
router.post('/generate-evicted-students' ,fetchEvictedStudents)




















module.exports = router