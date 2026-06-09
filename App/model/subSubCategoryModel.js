const mongoose = require('mongoose');

const subSubCategorySchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Please Fill The Category"],
            minLength:[2,"Please Fill min two char..."],
            // match: [/^[a-zA-Z ]{2,15}$/,"Please Fill correct value "],
        },

        image:String,
        parentCategory:{
          type:String,
          ref:"category"
        },
        
        subCategory:{
          type:String,
          ref:"subCategory"
        },
        slug:String,
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

let subSubCategoryModel=mongoose.model("subSubCategory",subSubCategorySchema)

module.exports=subSubCategoryModel