const mongoose = require('mongoose');
Schema = mongoose.Schema;

let userSchema =  new Schema({
    userId:{
        type:String,
        unique:true,
        index:true,
        default:''
    },
    firstName:{
        type:String,
        default:''
    },
    lastName:{
        type:String,
        default:''
    },
    password:{
        type:String,
        default:'password'
    },
    email:{
        type:String,
        default:''
    },
    mobileNumber:{
        type:Number,
        default:0
    },
    createdOn:{
        type:Date,
        default:""
    }

})


mongoose.model('User',userSchema);