const mongoose = require('mongoose');

const adminSchema=mongoose.Schema(
    {
        email:{
            type:String,
            required:[true,"Please Fill The email"],
           
             match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,        },
         password:{
            type:String,
            required:[true,"Please Fill The password"],
                     
        },
        image:String,
        
        companyLogo:String,
        companyName:String,
        companyAddress:String,
        companyPhone:String,
        companyEmail:String,
        companyMap:String,
       
       
         updated_at: {
            type: Date,
            default: Date.now()
        },
         deleted_at: {
            type: Date,
            default: null
        },
    }
)

let adminModel=mongoose.model("admin",adminSchema)

module.exports=adminModel