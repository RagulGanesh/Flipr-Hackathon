const mongoose=require('mongoose');

const mongoURI="mongodb://localhost:27017/flipr"

const connectToMongo=()=>{
    mongoose.connect(mongoURI).then(()=>{
        console.log("Connected Successfully");
    })
}


module.exports = connectToMongo