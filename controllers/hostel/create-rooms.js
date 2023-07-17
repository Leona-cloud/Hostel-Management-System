const Room = require("../../models/room");
const successResponse = require("../../responses/success-response");
const errorResponse = require("../../responses/error-response");

const createRooms = async (req, res) => {
  const alphabet = "ABCDE".split("");

  const { hostelId } = req.body;
  try {
    
    for(const string of alphabet){
        for (let i=1; i<=10; i++){
            await Room.create({
                roomId: i,
                block: string,
                hostelId
            })
        };
    };
    return successResponse('Rooms created successfully', res, {})
  } catch (error) {
    console.log("Room-creation-error:", error.message);
    return errorResponse(500, res, 'Something went wrong-room creation')
  }
};

module.exports = createRooms;
