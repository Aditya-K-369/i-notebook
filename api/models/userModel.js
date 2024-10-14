
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    phoneNo:{
        required:true,
        type:Number,
    },
    userName:{
        required:true,
        type:String,
    },
    password:{
        required:true,
        type:String,
    },
    date:{
        type: Date,
        default: Date.now
      }
});

module.exports=mongoose.model("userModel",userSchema);
