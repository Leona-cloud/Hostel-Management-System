const Evicted = require("../../models/evictedStudents")




const fetchEvictedStudents = async(req, res)=>{

    const authenticatedUser = req.authenticatedUser
    const {hostelId} = req.body

    try {
        const evictedStudents = await Evicted.find({hostelId: hostelId});
        const countEvicted = await Evicted.count({hostelId: hostelId});
        return res.status(200).json({
            success: false,
            message: 'Report generated successfully',
            data: {
                noOfEvictedStudents: countEvicted,
                evictedStudents
            }
        })
    } catch (error) {
        console.log("Report-evictedStudents-error:", error.message);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong-generate report evicted-students'
        })
    }

};





module.exports = fetchEvictedStudents