const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    },
    block: {
        type: String,
        required: true
    },
});


const Room = mongoose.model('Room', roomSchema);



module.exports = Room