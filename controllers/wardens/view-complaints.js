const Warden = require('../../models/warden');
const successResponse = require('../../responses/success-response');
const errorResponse = require('../../responses/error-response');
const Complaint = require('../../models/complaints');


const viewComplaints = async(req, res)=>{

    const authenticatedUser = req.user;

    const { page } = req.body;

    let pageNumber;
        if(page === undefined){
            pageNumber = 0;
        }else{
            pageNumber = Number(page) - 1;
        };

        const pageSize = 3
    
        const pagination = pageNumber * pageSize;
    try{
        const complaints = await Complaint.find().limit(pageSize).skip(pagination).sort({createdAt: -1});
        return successResponse('complaints fetched successfully', res, complaints)

    }catch(error){
        console.log("Fetch-complaints-error:", error.message);
        return errorResponse(500, res, 'Something went wrong-fetch complaints')
    }

};

module.exports = viewComplaints