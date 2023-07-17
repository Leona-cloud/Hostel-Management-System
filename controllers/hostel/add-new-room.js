const Room = require("../../models/room");
const successResponse = require("../../responses/success-response");
const errorResponse = require("../../responses/error-response");
const Warden = require("../../models/warden");


const addNewRoom  = async(req, res)=>{

    const authenticatedUser = req.user;

    const wardenExists = await Warden.findOne({_id: authenticatedUser.id})

    const {roomNumber, block} = req.body

    try {
        
    const newRoom = await Room.create({
        roomId: roomNumber,
        block: block,
        hostelId: wardenExists.hostelId
    });

    console.log(newRoom)
    return successResponse('New room created successfully', res, {})

    } catch (error) {
        console.log(error.message);
        return errorResponse(500, res, 'New Rooms failed')
    }

};



module.exports = addNewRoom