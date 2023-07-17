const NoticeBoard = require('../../models/noticeBoard');
const Warden = require('../../models/warden');
const _ = require('lodash');
const errorResponse = require('../../responses/error-response')



const updateNoticeBoard = async(req, res)=>{

    const authenticatedUser = req.user

    const wardenExists = await Warden.findOne({_id: authenticatedUser.id})
    if(!wardenExists) return res.status(400).json({success: false, message: 'Forbidden'});

   

    try {
        const Board = new NoticeBoard(_.pick(req.body, ['body', 'heading']));
        const result = await Board.save()
        console.log(result)
        return res.status(200).json({
            success: true,
            message: 'Notice-Board updated successfully',
        });
    } catch (error) { 
        console.log(error.message);
        return errorResponse(500, res, 'update notice-board failed')
    }

};



module.exports = updateNoticeBoard