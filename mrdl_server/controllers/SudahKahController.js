const {SudahKah, Video} = require("../models")


class SudahKahController{
    static createSudahKah(req,res,next){
        const {VideoID} = req.body
        const UserID = req.userData.id
        SudahKah.create({
            UserId:UserID,
            VideoId: VideoID
        }).then(data=>{
            res.status(201).json({
                sudahKah: data
            })
        }).catch(err=>{
            next(err)
        })
    }

    static getAllSudahKahByUserID(req,res,next){
        
        const UserID = req.userData.id

        SudahKah.findAll({
            where:{
                UserId: UserID
            }, include:[Video]
        }).then(data=>{
            res.status(200).json({
                sudahKah: data
            })
        }).catch(err=>{
            next(err)
        })
    }
}

module.exports = SudahKahController