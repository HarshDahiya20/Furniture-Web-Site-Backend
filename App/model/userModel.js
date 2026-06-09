const mongoose = require('mongoose');

const userSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Please Fill The User Name"],
            minLength:[2,"Please Fill min two char..."],
            match: [/^[a-zA-Z ]{2,15}$/,"Please Fill correct value "],
        },
        email:{
          type:String,
          required:[true,"Please Fill The Email"],
          match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          validate:{
            validator: async function(v){
              const email=await this.constructor.findOne({email:v,deleted_at:null});
              return !email;
            },
            message: props => "Email Alredy Existe..."
          }
        },
        password:{
          type:String,
          required:[true,"Please Fill The Password"]
        }, 
        address:String,
        gender:{
          type:Number,
          enum:['1' , '2'], 
          default: 1,     
        },
        phone:{
            type:String,
            required:[true,"Please Fill The Number"],
            validate:{
            validator: async function(v){
              const phone=await this.constructor.findOne({phone:v,deleted_at:null});
              return !phone;
            },
            message: props => "Phone Number Alredy Existe..."
          }
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
        
    }
)

let userModel=mongoose.model("user",userSchema)

module.exports=userModel