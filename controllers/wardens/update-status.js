const Student = require('../../models/student');
const Warden = require('../../models/warden');
const errorResponse = require('../../responses/error-response');



const UpdateStatus = async(req, res)=>{

    
    
    const { email, status } = req.body

    try {

        const studentExists = await Student.findOne({email: email})
        if(!studentExists)return res.status(400).json({
            success: false,
            message: "Student does not exist"
        });

        await studentExists.updateOne({_id: studentExists.id}).set({
            status: status
        })

        
    } catch (error) {
        console.log(error.message);
        return errorResponse(500, res, 'Student verified successfully')
    }

};



module.exports = UpdateStatus