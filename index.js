
const mongoose = require('mongoose');

let express = require("express")
require("dotenv").config()
let cors=require("cors")

const { adminRoute } = require("./App/routes/adminRoutes");
const { webRoute } = require('./App/routes/webRoutes');
const { adminCreate } = require('./App/config/helper');

let App = express()

App.use(cors())
App.use(express.json())

// -------------------------------- Admin Routes ------------------------------

App.use("/admin-api",adminRoute)

// this line gives permision to view folder
App.use("/uploads/category",express.static("uploads/category"))   
App.use("/uploads/slider",express.static("uploads/slider"))
App.use("/uploads/subCategory",express.static("uploads/subCategory"))
App.use("/uploads/subSubCategory",express.static("uploads/subSubCategory"))
App.use("/uploads/product",express.static("uploads/product"))
App.use("/uploads/whyChoseUs",express.static("uploads/whyChoseUs")) 
App.use("/uploads/testimonial",express.static("uploads/testimonial")) 


// ------------------------------Web Routes------------------------------

App.use("/web-api",webRoute)

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DBNAME}`)
.then((res)=>{
    App.listen(process.env.PORT, async ()=>{
      console.log(process.env.PORT);
       await adminCreate()
    })
})

