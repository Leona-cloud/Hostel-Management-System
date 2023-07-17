const Warden = require('../../models/warden');
const { signUpSchema } = require('../../schemas/register');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwtToken = require('../../utils/jwtToken');

const wardenRegister =  async(req, res)=>{

    let warden = await Warden.findOne({ email: req.body.email });
    if(warden) return res.status(400).json({
        success: false,
        message: "User with this email already registered",
    }); 

    warden = new Warden (_.pick(req.body, ['email', 'password']));

    try {
        const salt = await bcrypt.genSalt(10);
        warden.password = await bcrypt.hash(warden.password, salt);

        const result = await warden.save();
        console.log(result, 'warden registration');

        const {id} = result;

        const accessToken = await jwtToken(process.env.jwtSecret, {id});

        return res.status(200).json({
            success: true,
            message: 'warden registered successfully',
            accessToken
        });


    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Warden registration failed",
        });
    }

};




module.exports = wardenRegister



