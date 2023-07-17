const NoticeBoard = require('../../models/noticeBoard');
const _ = require('lodash');
const errorResponse = require('../../responses/error-response');
const Student = require('../../models/student');



const viewNoticeBoard = async(req, res)=>{

    const authenticatedUser = req.user

    const studentExists = await Student.findOne({_id: authenticatedUser.id})
    if(!studentExists) return res.status(400).json({success: false, message: 'user does not exist'});

    try {
        const fetchNotice = await NoticeBoard.find().sort({createdAt: -1})
        
        console.log(fetchNotice)
        return res.status(200).json({
            success: true,
            message: 'Notice-Board fetched successfully',
            fetchNotice
        });
    } catch (error) { 
        console.log(error.message);
        return errorResponse(500, res, 'update notice-board failed')
    }

};



module.exports = viewNoticeBoard