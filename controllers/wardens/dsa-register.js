const DSA = require('../../models/dsa');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwtToken = require('../../utils/jwtToken');

const dsaRegister =  async(req, res)=>{

    let dsa = await DSA.findOne({ email: req.body.email });
    if(dsa) return res.status(400).json({
        success: false,
        message: "User with this email already registered",
    }); 

    dsa = new DSA (_.pick(req.body, ['email', 'password', 'hostelId']));

    try {
        const salt = await bcrypt.genSalt(10);
        dsa.password = await bcrypt.hash(dsa.password, salt);

        const result = await dsa.save();
        console.log(result, 'dsa registration');

        const {id} = result;

        const accessToken = await jwtToken(process.env.jwtSecret, {id});

        return res.status(200).json({
            success: true,
            message: 'dsa registered successfully',
            accessToken
        });


    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "dsa registration failed",
        });
    }

};

module.exports = dsaRegister
