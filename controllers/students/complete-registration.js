const Student = require('../../models/student');
const successResponse = require('../../responses/success-response');
const errorResponse = require('../../responses/error-response');



const completeStudentRegistration = async (req, res)=>{

    const authenticatedUser = req.user;

    const student = await Student.findOne({id: authenticatedUser.id});
    if(!student) return errorResponse(400, res, 'Student does not exist');

    const { firstName, lastName, gender, phoneNumber, matricNo, department, hostelId, roomNumber, nextOfKin, nextOfKinPhoneNumbe} = req.body;

    


}