const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userModel',
    },
    description:{
        type:String,
    },
    title:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("noteSchema", noteSchema);
