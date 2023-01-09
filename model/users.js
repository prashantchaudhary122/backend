
const mongoose=require("mongoose");
 mongoose.set('strictQuery',true);
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"project name is Required"],
    },
    email:{
        type:String,
        required:[true,"email is Required"],
        unique:true,
    },
    age:{
        type:Number,
        required:[true,"age is required"],
        
    },
    contact:{
        type:String,
        required:[true,"contect is required"],
        
    },
    passwordHash:{
        required: true,
        type:String
    }
},
    {timestamps: true})

const User=mongoose.model('User',userSchema)
module.exports = User