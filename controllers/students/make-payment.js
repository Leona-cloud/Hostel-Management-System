const Student = require('../../models/student');
const Transaction = require('../../models/transaction');
const Hostel = require('../../models/hostel');
const errorResponse = require('../../responses/error-response');
const initializeTransaction = require('../../utils/paystackInitializeTransaction');
const crypto = require('crypto');


const makePayment = async (req, res)=>{

    const authenticatedUser = req.user;

    const student = await Student.findOne({email: authenticatedUser.email});
    if(!student){
        return errorResponse(400, res, 'User not registerd')
    };

    const email = req.user.email;
    const hostelId = student.hostelId
    const hostelFee = await Hostel.findOne({_id: hostelId});
    const newAmount = Number((hostelFee.fee) * 100)

    const userData = { email, newAmount, date: Date.now() };

    const encryptUserData = crypto
    .createHash("sha256")
    .update(JSON.stringify(userData))
    .digest("hex");

    const transactionRefernce = encryptUserData.substring(0,7).toLocaleUpperCase();

    try {
        
        const makeHostelPayment = await initializeTransaction(email, newAmount, transactionRefernce);
        if(!makeHostelPayment) return errorResponse(400, res, 'Transaction unsuccessful, something went wrong');

        await Transaction.create({
            studentId: req.user.id,
            transactionReference: transactionRefernce,
            amount: hostelFee.fee,
            currency: 'NGN',
            narration: `Hostel due for ${hostelFee.hostelName}, hostel`,
            depositorName: `${student.fullName}`
        });

        return res.status(200).json({
            success: true,
            message: 'transaction initializied successfully',
            initializationUrl: `${makeHostelPayment.data.authorization_url}`
        })

    } catch (error) {
        if(error.response){
            console.log("paystack-initialize-transaction-api-error", error.response.data);
        }
        console.log("paystack-initialize-transaction-internal-error", error.message);
        return null;
    }    
   
};





module.exports = makePayment;