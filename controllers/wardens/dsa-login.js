const DSA = require('../../models/dsa');
const successResponse = require('../../responses/success-response');
const errorResponse = require('../../responses/error-response');
const bcrypt = require('bcrypt');
const jwtToken = require('../../utils/jwtToken');

const dsaLogin = async(req, res)=>{

    const { email, password } = req.body;

    const dsaExists = await DSA.findOne({email});
    if(!dsaExists) return errorResponse(400, res, 'Invalid email or password');

    try {
        const validPassword = await bcrypt.compare(password, dsaExists.password);
        if(!validPassword) return errorResponse(400, res, 'Invalid email or password');

        const {id} = dsaExists;

        const accessToken = await jwtToken(process.env.jwtSecret, {id});

        return successResponse('user logged in successfully', res, {warden: {
            email: dsaExists.email,
            hostelId: dsaExists.hostelId,
        }, accessToken})

    } catch (error) {
        console.log("Warden-login-error:", error.message);
        return errorResponse(500, res, 'Something went wrong-DSA login')
    }

    

};



module.exports = dsaLogin;