const mongoose = require('mongoose');
const PasswordComplexity = require("joi-password-complexity");


const dsaSchema = new mongoose.Schema({
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
    hostelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostel'
    },
 
});


const DSA = mongoose.model('DSA', dsaSchema);


module.exports = DSA