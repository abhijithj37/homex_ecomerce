const mongoose = require('mongoose')
try{
    var connectDB =()=>{
        mongoose.connect(process.env.MONG0_URL,()=>{
           console.log(`connected to database`)
       })
   }
}
catch(error){
console.log("Error on connecting to db",error)
}

module.exports = connectDB;

