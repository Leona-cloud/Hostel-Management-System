const Joi = require('joi');
const PasswordComplexity = require("joi-password-complexity");

function  signUpSchema(user){
    const schema = Joi.object({
        email: Joi.string().required().trim().lowercase().email(),
        password: new PasswordComplexity({
            min: 8,
            max: 25,
            lowercase: 1,
            uppercase: 1,
            numeric:1,
            symbol: 1,
            requirementCount: 4
        }),
        confirmPassword: Joi.ref('password'),
    }) .with('password', 'confirmPassword')

    const options = {
        abortEarly: false,
        errors: {
            wrap: {
                label: ""
            },
        },
    }

    return schema.validate(user, options)
};


function wardenRegistrationCompletion(warden){
    const schema = Joi.object({
        phoneNumber:  Joi.string().length(11).pattern(/^[0-9]+$/).required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
    });

    const options = {
        abortEarly: false,
        errors: {
            wrap: {
                label: ""
            },
        },
    }

    return schema.validate(warden, options)
}


module.exports = {
    signUpSchema,
    wardenRegistrationCompletion
}