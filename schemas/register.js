const Joi = require('joi');
const PasswordComplexity = require("joi-password-complexity");

function  signUpSchema(user){
    const schema = Joi.object({
        email: Joi.string().required().trim().lowercase().email(),
        matricNo: Joi.string(),
        password: new PasswordComplexity({
            min: 8,
            max: 25,
            lowercase: 1,
            uppercase: 1,
            numeric:1,
            symbol: 1,
            requirementCount: 4
        }),
       
    })

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
};


function studentRegistrationCompletion(student){
    const schema = Joi.object({
        fullName: Joi.string().required(),
        gender: Joi.string().required(),
        phoneNumber: Joi.string().length(11).pattern(/^[0-9]+$/).required(),
        department: Joi.string().required(),
        nextOfKin: Joi.string().required(),
        nextOfKinPhoneNumber: Joi.string().length(11).pattern(/^[0-9]+$/).required(),
    });

    const options = {
        abortEarly: false,
        errors: {
            wrap: {
                label: ""
            },
        },
    }

    return schema.validate(student, options)
};



module.exports = {
    signUpSchema,
    wardenRegistrationCompletion,
    studentRegistrationCompletion
}