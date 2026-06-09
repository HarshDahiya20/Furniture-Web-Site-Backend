const mongoose = require('mongoose');

const sliderSchema=mongoose.Schema(
    {
        title:{
            type:String,
            required:[true,"Please Fill The title"],
            minLength:[2,"Please Fill min two char..."],
            // match: [/^[a-zA-Z ]{2,15}$/,"Please Fill correct value "],
        },

        image:String,

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

let sliderModel=mongoose.model("slider",sliderSchema)

module.exports=sliderModel