const mongoose = require('mongoose');


const wardenSchema = new mongoose.Schema({
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
    }
});


const Warden = mongoose.model('Warden', wardenSchema);


module.exports = Warden