const Student = require("../../models/student");
const successResponse = require("../../responses/success-response");
const errorResponse = require("../../responses/error-response");

const completeStudentRegistration = async (req, res) => {
  const authenticatedUser = req.user;

  const student = await Student.findOne({ _id: authenticatedUser.id });
  if (!student) return errorResponse(400, res, "Student does not exist");

  const {
    studentImage,
    gender,
    phoneNumber,
    department,
    nextOfKin,
    nextOfKinPhoneNumber,
  } = req.body;

  if (phoneNumber === nextOfKinPhoneNumber)
    return errorResponse(
      400,
      res,
      "Please use a different number for your next of kin"
    );

  try {
    await student.updateOne({ id: authenticatedUser.id }).set({
      studentImage,
      gender,
      phoneNumber,
      department,
      nextOfKin,
      nextOfKinPhoneNumber,
    });

    return successResponse("Student details updated successfuly", res, {
      student: {
        email: student.email,
        fullName: student.fullName,
        matricNo: student.matricNo,
        clearanceCertificate: student.clearanceCertificate,
        hostelId: student.hostelId,
        gender: student.gender,
        image: student.studentImage,
        department: student.department,
      },
    });
  } catch (error) {
    console.log(error.message);
    return errorResponse(500, res, "Student update-details failed");
  }
};

module.exports = completeStudentRegistration;
