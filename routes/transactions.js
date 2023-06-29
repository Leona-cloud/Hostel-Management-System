const express = require('express');
const router = express.Router();

const paystackWebhook = require('../webhooks/paystack');
const wardenAuth = require('../middlewares/warden-auth');
const verifyPayment = require('../controllers/wardens/verify-payment');



router.post('/paystack-webhook', paystackWebhook);
router.post('/verify-payment', wardenAuth, verifyPayment)




















module.exports = router