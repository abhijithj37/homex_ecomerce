const mongoose = require('mongoose')

const AdminSchema=new mongoose.Schema({
    username:{
        type:String
    },
    password:{
        type:String
    },
    phone:{
        type:String
    }
},{timestamps:true }
)

module.exports= mongoose.model('admin',AdminSchema)