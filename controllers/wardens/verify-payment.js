const verifyTransaction = require('../../utils/paystackVerifyPayment');
const errorResponse = require('../../responses/error-response');
const successResponse = require('../../responses/success-response');


const verifyPayment = async(req, res)=>{

    const { email } = req.body;

    const paymentSuccessful = await verifyTransaction(email);
    if(!paymentSuccessful) return errorResponse(400, res, 'Something went wrong - verifyPayment');


    return successResponse('payment verified successfully', res, {status: paymentSuccessful.data.status})

};



module.exports = verifyPayment