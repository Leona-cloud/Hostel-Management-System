const Warden = require('../../models/warden');
const successResponse = require('../../responses/success-response');
const errorResponse = require('../../responses/error-response');
const bcrypt = require('bcrypt');
const jwtToken = require('../../utils/jwtToken');

const wardenLogin = async(req, res)=>{

    const { email, password } = req.body;

    const wardenExists = await Warden.findOne({email});
    if(!wardenExists) return errorResponse(400, res, 'Invalid email or password');

    try {
        const validPassword = await bcrypt.compare(password, wardenExists.password);
        if(!validPassword) return errorResponse(400, res, 'Invalid email or password');

        const {id} = wardenExists;

        const accessToken = await jwtToken(process.env.jwtSecret, {id});

        return successResponse('user logged in successfully', res, {accessToken})

    } catch (error) {
        console.log("Warden-login-error:", error.message);
        return errorResponse(500, res, 'Something went wrong-Warden login')
    }

    

};



module.exports = wardenLogin;