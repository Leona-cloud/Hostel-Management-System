const Student = require('../../models/student');
const Warden = require('../../models/warden');
const errorResponse = require('../../responses/error-response');
const successResponse = require('../../responses/success-response');

const fetchStudents = async(req, res)=>{

    const authenticatedUser = req.user;

    const {hostelId, page, pageSize} = req.body;

    let pageNumber;
        if(page === undefined){
            pageNumber = 0;
        }else{
            pageNumber = Number(page) - 1;
        };
    
        const pagination = pageNumber * pageSize;
        console.log(pagination)

    const wardenExits = await Warden.findOne({_id: authenticatedUser.id});
    if(!wardenExits) return res.status(400).json({
        success: false,
        message: 'Wardens does not exist'
    });

    try {
        const students = await Student.find({hostelId: hostelId}).limit(pageSize).skip(pagination);
        return successResponse('rooms fetched successfully', res, {students}) 
    } catch (error) {
        console.log("fetch-student-error:", error.message);
        return errorResponse(500, res, 'Something went wrong-Fetch student')
    }


};




module.exports = fetchStudents