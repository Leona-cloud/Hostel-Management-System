const Student = require('../../models/student');
const Warden = require('../../models/warden');
const errorResponse = require('../../responses/error-response')


const fetchAStudent = async(req, res)=>{

    const {email} = req.body


    try {
        const studentExists = await Student.findOne({email: email}).select(['-password'])
        if(!studentExists)return res.status(400).json({
            success: false,
            message: "Student does not exist"
        });

        return res.status(200).json({
            success: true,
            message: 'student details fetched successfully',
            data: {
                email: studentExists.email,
                matric: studentExists.matricNo,
                name: studentExists.fullName
            } 
        })

    } catch (error) {
        console.log(error.message);
        return errorResponse(500, res, 'Fetch A student')
    }

};




module.exports = fetchAStudent