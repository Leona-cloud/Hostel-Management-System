const mongoose = require('mongoose');


const evictedStudentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase:true
    },
   
    fullName: {
        type: String,
    },
    gender: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    studentImage: {
        type: String,
    },
    matricNo: {
        type: String,
        unique: true
    },
    department: {
        type: String    
    },
    reasonForEviction: {
        type: String,
        required: true
    },
   
   
    status: {
        type: String,
        default: 'evicted'
    },

}, {timestamps: true});



const Evicted = mongoose.model('Evicted', evictedStudentSchema);



module.exports = Evicted