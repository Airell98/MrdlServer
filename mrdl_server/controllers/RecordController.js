const {Record,Video,User} = require("../models");

class RecordController{

static getAllRecords(){
    Record.findAll({
       include:[Video,User]
    }).then((data)=>{
       res.status(200).json({
        record:data
       })
    }).catch(err=>{
        next(err)
    })
}


    static getAllRecordsByUserId(req,res,next){
        const userID = req.userData.id;
        Record.findAll({
            where:{
                UserId:userID
            },include:[Video,User]
        }).then((data)=>{
           res.status(200).json({
            record:data
           })
        }).catch(err=>{
            next(err)
        })
    }

    static createNewRecord(req,res,next){
        const userID = req.userData.id;
        const{videoID, moduleID} = req.body;
        console.log(videoID, moduleID)
        Record.create({
            UserId: userID, VideoId:videoID, ModuleId: moduleID
        }).then((data)=>{
            res.status(200).json({
                record:data
               })
        }).catch(err=>{
            next(err)
        })
    }
}


module.exports = RecordController