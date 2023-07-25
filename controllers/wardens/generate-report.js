const Room = require("../../models/room");
const Student = require("../../models/student");



const generateReport = async(req, res)=>{

    const authenticatedUser = req.user;
    const {hostelId, page, pageSize} = req.body

    let pageNumber;
    if(page === undefined){
        pageNumber = 0;
    }else{
        pageNumber = Number(page) - 1;
    };

    const pagination = Number(pageNumber * pageSize);
    console.log(pagination)

    try {
        const countStudents = await Student.count({hostelId: hostelId})
        const countRooms = await Room.count({hostelId: hostelId});
        const roomReport = await Room.find({hostelId: hostelId}).limit(pageSize).skip(pagination);
        return res.status(200).json({
            success: false,
            message: 'Report generated successfully',
            data: {
                noOfStudents: countStudents,
                noOfRooms: countRooms,
                roomReport
            }
        })
    } catch (error) {
        console.log("Report-generating-error:", error.message);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong-generate report'
        })
    }

};



module.exports = generateReport