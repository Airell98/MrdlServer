const {User, Video,  Module} = require("../models");



class ModuleController{
    static createModule(req,res,next){
        const {name,sts} = req.body;
        Module.create({
         name,sts
        }).then((data)=>{
            res.status(201).json({
                module:data
            })
        }).catch(err=>{
         res.status(500).json(err)
     })
    }

static getAllModules(req,res,next){
   
    Module.findAll({
        include: Video,
        order: [["id", "ASC"],
          // We start the order array with the model we want to sort
          [Video, 'id', 'ASC']
        ]
      }).then((data)=>{
        res.status(200).json({
            module:data
        })
    }).catch(err=>{
     res.status(500).json(err)
 })
}

static getOneModule(req,res,next){
   
    const {module} = req.params;
    Module.findOne({
     where:{
         id: module
     }, include:[Video]
    }).then((data)=>{
        res.status(200).json({
            module:data
        })  
    }).catch(err=>{
     res.status(500).json(err)
 })
}


static editOneModuleStatus(req,res,next){
    console.log("masuk edit onestatus ===========")
    const {sts, moduleID} = req.body
    
    Module.update({
        sts
    },{
        where:{
            id:moduleID
        }
    }).then((data)=>{
        res.status(200).json({
            module:data
        })  
    }).catch(err=>{
     res.status(500).json(err)
 })
}

static activateOrDeactivateModule(req,res,next){
    let moduleName = "";

    const {sts, moduleID} = req.body;
    Module.findOne({
        where:{
            id:moduleID
        }
    }).then(data=>{
       moduleName = data.name;
       return Video.update({
           sts
       },{
        where:{
            ModuleId:moduleID
        } 
       })
    }).then((data)=>{
        return Module.update({
            sts
        },{
            where:{
                id:moduleID
            }
        })
    }).then(data=>{
        res.status(200).json({
            name:moduleName
        })
    }).catch(err=>{
        next(err)
    })


}



}


module.exports = ModuleController;