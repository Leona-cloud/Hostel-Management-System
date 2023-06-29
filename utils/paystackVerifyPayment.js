const axios = require("axios");
const Student = require('../models/student');
const Transaction = require('../models/transaction')


const verifyTransaction = async function(email){

    const Token = process.env.paystackSecretKey;

    const studentExists = await Student.findOne({email: email});
    if(!studentExists){
        console.log('Invalid email');
        return null
    };

    const reference = await Transaction.findOne({studentId: studentExists.id});

    try {
        const res = await axios({
            method: 'GET',
            url: `${process.env.paystackUrl}/transaction/verify/${reference.transactionReference}`,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${Token}`
            }
        });

        console.log('paystack-verify-transaction', res.data);
        return res.data
    } catch (error) {
        if(error.response){
            console.log("paystack-verify-transaction-api-error", error.response.data);
        }
        console.log("paystack-verify-transaction-internal-error", error.message);
        return null;
    }

};



module.exports = verifyTransaction;