const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
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
    matricNo: {
        type: String,
        unique: true
    },
    department: {
        type: String    
    },
    hostelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostel'
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
    }

});



const Student = mongoose.model('Student', studentSchema);



module.exports = Student