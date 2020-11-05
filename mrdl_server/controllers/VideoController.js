const {User, Video,  Module} = require("../models");



class VideoController{

static getAllVideos(req,res,next){
    Video.findAll().then((data)=>{
      res.status(200).json({
        video:data
      })
    }).catch(err=>{
        next(err)
    })
}

static getOneVideo(req,res,next){
    const {videoID} = req.params
    Video.findOne({where:{
        id: Number(videoID)
    }, include:[Module]}).then((data)=>{
        res.status(200).json({
          video:data
        })
      }).catch(err=>{
          next(err)
      })
}

   static createVideo(req,res,next){
       const{name, ModuleId, video_link,sts, part, desc} = req.body
       Video.create({
           name,ModuleId,video_link,sts, part, desc
       }).then((data)=>{
             res.status(201).json(
                { video:data}
             )
       }).catch(err=>{
           
           next(err)
       })
   }

   static createPPT(req,res,next){
    const{name, ModuleId, video_link,sts, part, desc, ppt_link , type} = req.body
    Video.create({
        name, ModuleId, video_link,sts, part, desc, ppt_link , type
    }).then((data)=>{
          res.status(201).json(
             { video:data}
          )
    }).catch(err=>{
        
        next(err)
    })
}


static  editVideoNameByID(req,res,next){
    console.log("masuk edit video", req.body, 9999999999999999999999999999)
    const {videoID} = req.params
    const{name} = req.body
    
    Video.update({
        name:req.body.name
    },{
        where:{
            id: videoID
        }
    }).then((data)=>{
        
            //  console.log(data[0].dataValues.Videos)
             
          res.status(200).json({
               data
          })
        
    }).catch(err=>{
       next(err)
    })
}

static editVideoStsByID(req,res,next){
    const {videoID} = req.params
    const{sts} = req.body

    Video.update({
        sts
    },{
        where:{
            id: videoID
        }
    }).then((data)=>{
       res.status(200).json({
           video: data
       })
    }).catch(err=>{
        next(err)
    })
}
static editPPTLinkByID(req,res,next){
    const {videoID} = req.params
    const{ppt_link} = req.body

    Video.update({
        ppt_link
    },{
        where:{
            id: videoID
        }
    }).then((data)=>{
       res.status(200).json({
           video: data
       })
    }).catch(err=>{
        next(err)
    })
}

static editVideoModuleByID(req,res,next){
    console.log("masuk edit module video by id")
    const {videoID} = req.params
    const{ModuleId} = req.body

    Video.update({
        ModuleId
    },{
        where:{
            id: videoID
        }
    }).then((data)=>{
       res.status(200).json({
           video: data
       })
    }).catch(err=>{
        next(err)
    })
}

static editVideoLinkByID(req,res,next){
    console.log("masuk edit Link video by id")
    const {videoID} = req.params
    const{video_link} = req.body

    Video.update({
        video_link
    },{
        where:{
            id: videoID
        }
    }).then((data)=>{
       res.status(200).json({
           video: data
       })
    }).catch(err=>{
        next(err)
    })
}

static editVideoPartByID(req,res,next){
    console.log("masuk edit part video by id ===============")
    const {videoID} = req.params
    const{part} = req.body

    Video.update({
        part
    },{
        where:{
            id: videoID
        }
    }).then((data)=>{
       res.status(200).json({
           video: data
       })
    }).catch(err=>{
        next(err)
    })
}

static editVideoDescByID(req,res,next){
   
    const {videoID} = req.params
    const{desc} = req.body

    Video.update({
        desc
    },{
        where:{
            id: videoID
        }
    }).then((data)=>{
       res.status(200).json({
           video: data
       })
    }).catch(err=>{
        next(err)
    })
}

static deleteVideoById(req,res,next){
    console.log("hapus video================")
        const{videoID} = req.params
        Video.destroy({
            where:{
                id: videoID
            }
        }).then((data)=>{
            res.status(200).json({
                data
            })
        }).catch(err=>{
            next(err)
        })
}


   static createModule(req,res,next){
       const {name,sts} = req.body;
       Module.create({
        name,sts
       }).then((data)=>{
           res.status(201).json({
               module:data
           })
       }).catch(err=>{
        next(err)
    })
   }
}


module.exports = VideoController
