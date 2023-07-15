const Student = require("../../models/student");
const successResponse = require("../../responses/success-response");
const errorResponse = require("../../responses/error-response");
const uploadImage = require('../../utils/uploadImage')


const uploadCertificate = async(req, res)=>{

    
  const authenticatedUser = req.user;

    const student = await Student.findOne({ _id: authenticatedUser.id });
    if (!student) return errorResponse(400, res, "Student does not exist");

    const { file } = req.body;

   try {
    const publicId = student.fullName+'Clearance'
    const uploadImageSuccess = await uploadImage(req.file.path, publicId);
    if(!uploadImageSuccess){
      console.log('something went wrong -image upload')
    };

    await student.updateOne({ id: authenticatedUser.id }).set({
        clearanceCertificate: uploadImageSuccess.public_id
      });

      return successResponse('Student image uploaded successfuly', res, {})
   } catch (error) {
        console.log(error.message);
        return errorResponse(500, res, 'Student upload-image failed')
   }

};



module.exports = uploadCertificate