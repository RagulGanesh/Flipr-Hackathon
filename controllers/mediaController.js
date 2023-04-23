const Media=require("../models/Media")
const fs = require('fs')

exports.getAll=async(req,res)=>{
    try{
        const media=await Media.find()
        res.json(media);
    }catch(err){
        console.log(err)
        res.status(400).json(err)
    }
}


exports.create=async(req,res)=>{
    try{
        const createMedia=Media.create({
            name : req.body.name,
            description : req.body.description,
            category : req.body.category,
            speaker : req.body.speaker,
            thumbnail : fs.readFileSync(req.body.thumbnail).toString("base64"),
            videos : req.body.videos
        })
        console.log(thumbnail)
        res.send(createMedia)
        

    }catch(err){
        console.log(err)
        res.status(400).json(err)
    }
}

exports.deleteItem=async(req,res)=>{
    try {
        //find the note to be deleted and delete it
        let note = await Media.findById(req.params.id);
        if (!note) {
          return res.status(404).send("Not found");
        }
        //allow deletion only if the user pwns this note
        note = await Media.findByIdAndDelete(req.params.id);
        return res.json({ Success: "Note has been successfully deleted!"});
      } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
      }
}

exports.getItem = async(req,res) =>{
    try {
        let note = await Media.findById(req.params.id);
        return res.json({note});
      } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
      }
}

exports.search = async (req, res, next) => {
    const query = req.body.query;
    try {
        const videos = await Media.find({
        name: { $regex: query, $options: "i" },
      }).limit(40);
      res.status(200).json(videos);
    } 
    catch (err) {
        next(err);
    }
}

