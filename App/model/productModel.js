const mongoose = require('mongoose');


const productSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Please Fill The Product name"],
            minLength:[2,"Please Fill min two char..."],
            // match: [/^[a-zA-Z ]{2,15}$/,"Please Fill correct value "],
        },

        image:String,
        gallery:[],
        parentCategory:{
          type:String,
          ref:"category"
        },
        
        subCategory:{
          type:String,
          ref:"subCategory"
        },
        subSubCategory:{
          type:String,
          ref:"subSubCategory"
        },
        material:[
          {
            type:String,
            ref:"material"
          },
        ],
        color:[ 
          {
            type:String,
            ref:"color"
          },
        ],
        description:String,
        price:Number,
        actualPrice:Number,
        stock:Number,
        productType:{
            type:String,
            enum:["1","2","3"], //1->Featured, 2->New Arrival, 3->On Sale
             
        },
        bestSelling:{
          type:Boolean,
          default:false
        },
        topRated:{
          type:Boolean,
          default:false
        },
        upSell:{
          type:Boolean,
          default:false
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

let productModel=mongoose.model("product",productSchema)

module.exports=productModel