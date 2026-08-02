let express=require("express")
const { authRoute } = require("./web/authRoutes")
const { homeRoute } = require("./web/homeRoutes")
const { cartRoute } = require("./web/cartRoutes")
const { orderRoute } = require("./web/orderRoutes")
const { wishlistRoute } = require("./web/wishlistRoutes")

let webRoute=express.Router()


webRoute.use("/user",authRoute)
webRoute.use("/home",homeRoute)
webRoute.use("/cart",cartRoute)
webRoute.use("/order",orderRoute)
webRoute.use("/wishlist",wishlistRoute)

module.exports={webRoute} 