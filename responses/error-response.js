function errorResponse(statusCode, response, message){
    return response.status(statusCode).json({
        success: true,
        message,
    })
};



module.exports = errorResponse