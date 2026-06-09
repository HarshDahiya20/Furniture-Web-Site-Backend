let express=require("express")
const { getSlider, getProduct, getProductDetail, getTestimonial, getFeaturedProduct, getOnSaleProduct, getNewArrivalProduct } = require("../../controller/web/homeController")

let homeRoute=express.Router()

homeRoute.get('/slider',getSlider)
homeRoute.get('/products',getProduct)
homeRoute.get('/product-details/:slug',getProductDetail)
homeRoute.get('/testimonials', getTestimonial)
homeRoute.get('/featured', getFeaturedProduct)
homeRoute.get('/new-arrivals', getNewArrivalProduct)
homeRoute.get('/on-sale', getOnSaleProduct)
module.exports={homeRoute}