const mongoose = require('mongoose');

const whyChoseUsSchema=mongoose.Schema(
    {
        title:{
            type:String,
            required:[true,"Please Fill The whyChoseUs"],
            minLength:[2,"Please Fill min two char..."],
            // match: [/^[a-zA-Z ]{2,15}$/,"Please Fill correct value "],
        },

        image:String,

        order:{
            type:Number,
            required:true,
        },
        description:{
          type:String,
          required:[true,"Please Fill The Description"],
          minLength:[2,"Please Fill min two char..."],
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

let whyChoseUsModel=mongoose.model("whyChoseUs",whyChoseUsSchema)

module.exports=whyChoseUsModel