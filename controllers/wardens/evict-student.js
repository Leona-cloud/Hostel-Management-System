const Evicted = require("../../models/evictedStudents");
const Room = require("../../models/room");
const Student = require("../../models/student");
const errorResponse = require("../../responses/error-response");
const successResponse = require("../../responses/success-response");

const evictStudent = async (req, res) => {
  const { email, reason } = req.body;

  const student = await Student.findOne({ email: email });
  if (!student) return errorResponse(400, res, "student does not exist");

  const roomExists = await Room.findOne({
    hostelId: student.hostelId,
    block: student.block,
    roomId: student.roomNumber,
  });
  if (!roomExists) return errorResponse(400, res, "Room does not exist");

  try {
    const evictedStudentExists = await Evicted.findOne({
      email: student.email,
    });
    if (evictedStudentExists) return errorResponse(400, res, "Student already evicted");

    await Evicted.create({
      email: student.email,
      fullName: student.fullName,
      gender: student.gender,
      phoneNumber: student.phoneNumber,
      studentImage: student.studentImage,
      matricNo: student.matricNo,
      reasonForEviction: reason,
      department: student.department,
      hostelId: student.hostelId
    });
    const removeOccupant = roomExists.occupants.filter((id) => {
      return id !== `${student.id}`;
    });
    await roomExists
      .updateOne({
        hostelId: student.hostelId,
        block: student.block,
        roomId: student.roomNumbe,
      })
      .set({
        occupants: removeOccupant,
      });
    await student.deleteOne({_id: student.id});
    return successResponse('Student evicted successfully', res, {})
  } catch (error) {
    console.log("evict-student-error:", error.message);
        return errorResponse(500, res, 'Something went wrong-evict student')
  }
};

module.exports = evictStudent;
