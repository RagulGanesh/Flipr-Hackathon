const express = require("express");
const router = express.Router();
var fetchuser = require('../middleware/fetchuser')

const mediaController=require('../controllers/mediaController')
const multer=require('multer')

const fs=require('fs')
const path=require('path')

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        if(!fs.existsSync("public")){
            fs.mkdirSync("public")
        }
        if(!fs.existsSync("public/videos")){
            fs.mkdirSync("public/videos")
        }

        cb(null,"public/videos")
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})

const upload=multer({
    storage:storage,
    
})


router.get('/all',mediaController.getAll)

router.post('/create',upload.single('videos'),mediaController.create)

module.exports=router