function errorResponse(statusCode, response, message){
    return response.status(statusCode).json({
        success: false,
        message,
    })
};



module.exports = errorResponse