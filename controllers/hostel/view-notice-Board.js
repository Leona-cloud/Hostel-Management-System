const NoticeBoard = require('../../models/noticeBoard');
const _ = require('lodash');
const errorResponse = require('../../responses/error-response');
const Student = require('../../models/student');



const viewNoticeBoard = async(req, res)=>{

    const { page } = req.body;

    let pageNumber;
        if(page === undefined){
            pageNumber = 0;
        }else{
            pageNumber = Number(page) - 1;
        };

        const pageSize = 3
    
        const pagination = pageNumber * pageSize;

    const authenticatedUser = req.user

    const studentExists = await Student.findOne({_id: authenticatedUser.id})
    if(!studentExists) return res.status(400).json({success: false, message: 'user does not exist'});

    try {
        const fetchNotice = await NoticeBoard.find().limit(pageSize).skip(pagination).sort({createdAt: 1})
        
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