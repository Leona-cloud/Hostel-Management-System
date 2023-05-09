const Warden = require('../../models/warden');
const successResponse = require('../../responses/success-response');
const errorResponse = require('../../responses/error-response');
const { wardenRegistrationCompletion } = require('../../schemas/register');


const completeWardenRegistration = async(req, res)=>{

    const { id } = req.user;

    const { error } = wardenRegistrationCompletion(req.body);
    if (error) return errorResponse(400, res,  [error.message.split(". ")])

    const warden = await Warden.findOne({id});
    if(!warden) return errorResponse(400, res, 'Warden does not exist');

    const { firstName, lastName, phoneNumber} = req.body

    try {
        await warden.updateOne({id}).set({
            firstName,
            lastName,
            phoneNumber
        });

        return successResponse('user registration completed successfully', res, {})
    } catch (error) {
        console.log("Warden-complete-registration-error:", error.message);
        return errorResponse(500, res, 'Something went wrong-Warden-complete-registration')
    }

};



module.exports = completeWardenRegistration;