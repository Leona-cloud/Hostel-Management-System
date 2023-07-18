const Hostel = require('../../models/hostel');
const successResponse = require('../../responses/success-response');
const errorResponse = require('../../responses/error-response');

const fetchHostelID = async (req, res)=>{


    const { hostelId } = req.body;
try {
    
    const hostels = await Hostel.findOne({_id: hostelId }).select('-wardenId');
    console.log(hostels)

    return successResponse('Hostels fetched successfully', res, hostels);
} catch (error) {
    console.log("hostel-fetching-error:", error.message);
    return errorResponse(500, res, 'Something went wrong-hostel fetching')
}


};



module.exports = fetchHostelID;