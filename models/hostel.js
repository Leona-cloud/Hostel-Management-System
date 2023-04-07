const mongoose = require('mongoose');


const hostelSchema = new mongoose.Schema({
    hostelName: {
        type: String,
        required: true
    },
    hostelGender: {
        type: String,
        required: true
    },
    wardenId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Warden',
        required: true
    }
});



const Hostel = mongoose.model('Hostel', hostelSchema);


module.exports = Hostel