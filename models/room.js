const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true
    },
    block: {
        type: String,
    },
    hostelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostel'
    },
    occupants: {
        type: Array,
        default: []
    }
});


const Room = mongoose.model('Room', roomSchema);



module.exports = Room