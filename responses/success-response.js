function successResponse(message, response, data={}){
    return response.status(200).json({
        success: true,
        message,
        data
    })
};





module.exports = successResponse