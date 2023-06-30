const Student = require('../../models/student');
const { signUpSchema } = require('../../schemas/register');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwtToken = require('../../utils/jwtToken');
const successResponse = require("../../responses/success-response");
const errorResponse = require("../../responses/error-response");





const studentRegister =  async (req, res)=>{

    const { error } = signUpSchema(req.body);
    if (error) {
        return res.status(400).json({ message: [error.message.split(". ")] });
    };

    const getDomain = req.body.email.split('@');
    const studentMail = getDomain.find(domain => domain === 'student.oauife.edu.ng');
    if(!studentMail)return errorResponse(400, res, 'please use a valid student mail')
    

    let student = await Student.findOne({ email: req.body.email });
    if(student) return res.status(400).json({
        success: false,
        message: "User with this email already registered",
    }); 

    student = new Student (_.pick(req.body, ['email', 'password', 'confirmPassword', 'matricNo']));

    try {

        const salt = await bcrypt.genSalt(10);
        student.password = await bcrypt.hash(student.password, salt);
        student.confirmPassword = await bcrypt.hash(student.confirmPassword, salt);

        const result = await student.save();
        console.log(result, 'student registration');

        const {id} = result;

        const accessToken = await jwtToken(process.env.jwtSecret, {id});

        return res.status(200).json({
            success: true,
            message: 'student registered successfully',
            accessToken
        });


    } catch (error) {
        console.log(error.message);
        return errorResponse(500, res, 'Student registration failed')
       
    }

};




module.exports = studentRegister



