const mongoose = require('mongoose');

const faqSchema=mongoose.Schema(
    {
        question:{
            type:String,
            required:[true,"Please Fill The question"],
        },
        answer:{
            type:String,
            required:[true,"Please Fill The answer"],
        },
        order:{
             type:Number,
            required:true,
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

let faqModel=mongoose.model("faq",faqSchema)

module.exports=faqModel