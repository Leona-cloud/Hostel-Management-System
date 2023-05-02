const Hostel = require('../../models/hostel');
const successResponse = require('../../responses/success-response');
const errorResponse = require('../../responses/error-response')


const createHostel = async (req, res)=>{

    const authenticatedUser = req.user;
    
    try {
        const { gender, hostelName} = req.body;
        //check if hostel exists
        const checkIfHostelExists = await Hostel.findOne({hostelName, gender});
        if(checkIfHostelExists){
            return errorResponse(400, res, 'Hostel already exists');
        }
        const createHostel = await Hostel.create({
            gender,
            hostelName,
            wardenId: authenticatedUser.id
            });
            await createHostel.save();
        
          return successResponse('Hostel created successfully', res, {createHostel})

    } catch (error) {
        console.log("Hostel-creation-error:", error.message);
        return errorResponse(500, res, 'Something went wrong-hostel creation')
    }
    

};




module.exports = createHostel