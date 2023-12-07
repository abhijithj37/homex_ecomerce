const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    resetPasswordToken:{
        type : String,
    }
},
    {timestamps : true}
    )
module.exports = mongoose.model('user',UserSchema)