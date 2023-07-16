const Student = require("../../models/student");
const successResponse = require("../../responses/success-response");
const errorResponse = require("../../responses/error-response");



const uploadCertificate = async(req, res)=>{

    
  const authenticatedUser = req.user;

    const student = await Student.findOne({ _id: authenticatedUser.id });
    if (!student) return errorResponse(400, res, "Student does not exist");

   try {

      const { file } = req.body
   
    await student.updateOne({ id: authenticatedUser.id }).set({
        clearanceCertificate: file
      });

      console.log('certificate-upload successful')
      return successResponse('Student image uploaded successfuly', res, {})
   } catch (error) {
        console.log(error.message);
        return errorResponse(500, res, 'Student upload-image failed')
   }

};



module.exports = uploadCertificate