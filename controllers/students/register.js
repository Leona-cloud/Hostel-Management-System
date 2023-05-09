const Student = require('../../models/student');
const { signUpSchema } = require('../../schemas/register');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwtToken = require('../../utils/jwtToken');





const studentRegister =  async (req, res)=>{

    const { error } = signUpSchema(req.body);
    if (error) {
        return res.status(400).json({ message: [error.message.split(". ")] });
    };

    let student = await Student.findOne({ email: req.body.email });
    if(student) return res.status(400).json({
        success: false,
        message: "User with this email already registered",
    }); 

    student = new Student (_.pick(req.body, ['email', 'password', 'confirmPassword']));

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
        return res.status(500).json({
            success: false,
            message: "Student registration failed",
        });
    }

};




module.exports = studentRegister



