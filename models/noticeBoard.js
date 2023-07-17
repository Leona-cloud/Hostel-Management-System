const mongoose = require('mongoose');


const NoticeBoardSchema = new mongoose.Schema({

    heading: {
        type: String,
        required: true
    },

    body: {
        type: String,
        required: true
    }

}, {timestamps: true});



const NoticeBoard = mongoose.model('NoticeBoard', NoticeBoardSchema);


module.exports = NoticeBoard