const Student = require('../../models/student');
const Warden = require('../../models/warden');
const errorResponse = require('../../responses/error-response')


const VerifyStudent = async(req, res)=>{

    const authenticatedUser = req.user

    const {email} = req.body

    const wardenExists = await Warden.findOne({_id: authenticatedUser._id});
    console.log(wardenExists)
    if(!wardenExists) return res.status(400).json({
        success: false,
        message: "Access forbidden"
    });

    try {
        const studentExists = await Student.findOne({email: email}).select(['-password'])
        if(!studentExists)return res.status(400).json({
            success: false,
            message: "Student does not exist"
        });

        return res.status(200).json({
            success: true,
            message: 'student details fetched successfully',
            studentExists 
        })

    } catch (error) {
        console.log(error.message);
        return errorResponse(500, res, 'New Rooms failed')
    }

};




module.exports = VerifyStudent