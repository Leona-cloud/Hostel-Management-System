const Room = require('../../models/room');
const successResponse = require('../../responses/success-response');

const fetchRooms = async (req, res)=>{

    const {hostelId, page, block} = req.body;

    try {
        const pageSize = 20;
        let pageNumber;
        if(page === undefined){
            pageNumber = 0;
        }else{
            pageNumber = Number(page) - 1;
        };
    
        const pagination = pageNumber * pageSize;
        console.log(pagination)
    
        const rooms = await Room.find({hostelId, block}).limit(pageSize).skip(pagination);
    
        return successResponse('rooms fetched successfully', res, {rooms}) 
    } catch (error) {
        console.log("Room-fetching-error:", error.message);
        return errorResponse(500, res, 'Something went wrong-room fetching')
    }
    

};




module.exports = fetchRooms;