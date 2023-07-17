const Hostel = require('../../models/hostel');
const successResponse = require('../../responses/success-response');
const errorResponse = require('../../responses/error-response');

const fetchHostels = async (req, res)=>{


    const { gender } = req.body;
try {
    
    const hostels = await Hostel.find({gender}).select('-wardenId');

    return successResponse('Hostels fetched successfully', res, hostels);
} catch (error) {
    console.log("hostel-fetching-error:", error.message);
    return errorResponse(500, res, 'Something went wrong-hostel fetching')
}


};



module.exports = fetchHostels;