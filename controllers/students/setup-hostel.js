const Student = require("../../models/student");
const Room = require("../../models/room");
const successResponse = require("../../responses/success-response");
const errorResponse = require("../../responses/error-response");

const setupHostel = async (req, res) => {
    const authenticatedUser = req.user;

    const student = await Student.findOne({ _id: authenticatedUser.id }).select(['-password'])
    if (!student) return errorResponse(400, res, "Student does not exist");
    if(student.hostelId !== "") return errorResponse(400, res, "Student already booked a room");

    //create endpoiont to fetch hostels based on gender
    const { hostelId, block, roomNumber } = req.body;
    console.log(req.body, 'body')

    try {
          //check if hostel && room exists
    const roomExists = await Room.findOne({
        hostelId: hostelId,
        block: block,
        roomId: roomNumber,
    });
    console.log(roomExists)
    if (!roomExists)
        return errorResponse(400, res, "The room selected does not exist");
    //if room exists
    if (roomExists.occupants.length >= 6) {
        return errorResponse(
            400,
            res,
            "Room capacity full, please contact the warden"
        );
    };
    console.log(roomExists.occupants.includes(`${req.user.id}`))
    if(roomExists.occupants.includes(`${req.user.id}`)){
        return errorResponse(
            400,
            res,
            "Occupant exists already, please contact the warden"
        );
    }
    else {
         roomExists.occupants.push(`${req.user.id}`);
         roomExists.save()
        await student.updateOne({id: student.id}).set({roomId: roomExists.id, hostelId, block, roomNumber});
    };

    return successResponse('Student details updated successfuly', res, {roomExists, student})
    } catch (error) {
        console.log(error.message);
        return errorResponse(500, res, 'Student setUp-hostel failed')
    }
};






module.exports = setupHostel
