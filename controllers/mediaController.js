const Media=require("../models/Media")

exports.getAll=async(req,res)=>{
    try{
        const media=await Media.find()
        res.json(media);
    }catch(err){
        console.log(err)
        res.status(400).json(error)
    }
}


exports.create=async(req,res)=>{
    const {name}=req.body
     
    let videopath="\\"+req.file.path
    try{
        const createMedia=Media.create({
            name,
            videos:videopath
        })
        res.json(createMedia)

    }catch(err){
        console.log(err)
        res.status(400).json(err)
    }
}