const mongoose = require('mongoose');


const complaintsSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    resolved: {
        type: Boolean,
        default: false
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student'
    }
}, {timestamps: true});


const Complaint = mongoose.model('Complaint', complaintsSchema);


module.exports = Complaint