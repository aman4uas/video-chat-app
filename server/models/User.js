const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    gender:{
        type:String,
        enum:["Male", "Female"],
        required:true,
    },
    dob:{
        type:Date, 
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    token:{
        type:String,
    },
    resetPasswordExpires: {
        type:Date,
    },
});

module.exports = mongoose.model("user", userSchema);