
const mongoose = require('mongoose');

const colorSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Please Fill The Color"],
            minLength:[2,"Please Fill min two char..."],
            match: [/^[a-zA-Z ]{2,15}$/,"Please Fill correct value "],
        },
        code:{
            type:String,
            required:[true,"Please Fill The code"],
        },
        order:{
             type:Number,
            required:[true,"Please Fill The order"],
        },
        status:{
            type:Boolean,
            default:true
        },
         created_at: {
            type: Date,
            default: Date.now()
        },
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

let colorModel=mongoose.model("color",colorSchema)

module.exports=colorModel