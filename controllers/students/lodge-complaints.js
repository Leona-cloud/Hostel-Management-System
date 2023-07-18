const Student = require('../../models/student');
const Complaint = require('../../models/complaints');



const lodgeComplaints = async(req, res)=>{
    
    const authenticatedUser = req.user

    const {title, body} = req.body

    const studentExists = await Student.findOne({_id: authenticatedUser.id});
    if(!studentExists) return res.status(400).json({
        success: false,
        message:'Unauthorized request'
    });

    try {
        const complaint = await Complaint.create({
            title: title,
            body: body,
            studentId: studentExists.id
        });

        return res.status(200).json({
            success: true,
            message: 'Student logged in successfully',
            data: {
               complaint
            }
        });
    } catch (error) {
        console.log("student-lodgeComplaints-error:", error.message);
        return errorResponse(500, res, 'Something went wrong-Student lodge complaints')
    }

};





module.exports = lodgeComplaints