const mongoose = require('mongoose');
const PasswordComplexity = require("joi-password-complexity");


const wardenSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: new PasswordComplexity({
        min: 8,
        max: 25,
        lowercase: 1,
        uppercase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 4
    }),
    confirmPassword: {
        type: String,
        required: true,
         minlength: 8,
        maxlength: 1024
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
});


const Warden = mongoose.model('Warden', wardenSchema);


module.exports = Warden