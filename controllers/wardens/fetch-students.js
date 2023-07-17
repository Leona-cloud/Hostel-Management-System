const Student = require('../../models/student');
const Warden = require('../../models/warden');

const fetchStudents = async(req, res)=>{

    const authenticatedUser = req.user

    const wardenExists = await Warden.findOne({_id: authenticatedUser.id})
    if(!wardenExists) return res.status(400).json({success: false, message: 'Forbidden'});

    try {
        const students = await Student.find().sort({createdAt: -1})
        console.log(students)
        return res.status(200).json({
            success: true,
            message: 'Students fetched successfully',
            students
        });
    } catch (error) { 
        console.log(error.message);
        return errorResponse(500, res, 'Fetch Students failed')
    }

};




module.exports = fetchStudents