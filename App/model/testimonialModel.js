const mongoose = require('mongoose');

const testimonialSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Please Fill The testimonial"],
            minLength:[2,"Please Fill min two char..."],
            // match: [/^[a-zA-Z ]{2,15}$/,"Please Fill correct value "],
        },

        image:String,
        rating:{
            type:Number,
            required:[true,"Please Fill The rating"],
        },
        order:{
            type:Number,
            required:[true,"Please Fill The Order"],
        },
        designation:{
          type:String,
          required:[true,"Please Fill The Designation"],
          minLength:[2,"Please Fill min two char..."],
        },
        message:{
          type:String,
          required:[true,"Please Fill The Message"],
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

let testimonialModel=mongoose.model("testimonial",testimonialSchema)

module.exports=testimonialModel