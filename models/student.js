const mongoose = require('mongoose');
const PasswordComplexity = require("joi-password-complexity");


const studentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase:true
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
    fullName: {
        type: String,
    },
    gender: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    accountVerified: {
        type: Boolean,
        default: false
    },
    studentImage: {
        type: String,
    },
    matricNo: {
        type: String,
        unique: true
    },
    clearanceCertificate: {
        type: String
    },
    department: {
        type: String    
    },
    hostelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostel'
    },
    block: {
        type: String,
    },
    roomNumber: {
        type: Number,
        
    },
    nextOfKin: {
        type: String  
    },
    nextOfKinPhoneNumber: {
        type: String 
    },
    paymentVerified: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'checked-in']
    },

}, {timestamps: true});



const Student = mongoose.model('Student', studentSchema);



module.exports = Student