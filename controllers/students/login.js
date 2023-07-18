const Student = require('../../models/student')
const successResponse = require('../../responses/success-response');
const errorResponse = require('../../responses/error-response');
const bcrypt = require('bcrypt');
const jwtToken = require('../../utils/jwtToken');

const studentLogin = async(req, res)=>{

    const { email, password } = req.body;

    const studentExists = await Student.findOne({email})
    if(!studentExists) return errorResponse(400, res, 'Invalid email or password');

    try {
        const validPassword = await bcrypt.compare(password, studentExists.password);
        if(!validPassword) return errorResponse(400, res, 'Invalid email or password');

        const {id} = studentExists;

        const accessToken = await jwtToken(process.env.jwtSecret, {id});

        return res.status(200).json({
            success: true,
            message: 'Student logged in successfully',
            data: {
                student:{
                    email: studentExists.email,
                    fullName: studentExists.fullName,
                    matricNo: studentExists.matricNo,
                    clearanceCertificate: studentExists.clearanceCertificate,
                    hostelId: studentExists.hostelId,
                    gender: studentExists.gender
                },
                accessToken
            }
        });

    } catch (error) {
        console.log("student-login-error:", error.message);
        return errorResponse(500, res, 'Something went wrong-Student login')
    }

    

};



module.exports = studentLogin;