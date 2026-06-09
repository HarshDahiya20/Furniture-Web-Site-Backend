let express=require("express")

const { colorRoute } = require("./admin/colorRoutes")
const { materialRoute } = require("./admin/materialRoutes")
const { countryRoute } = require("./admin/countryRoutes")
const { categoryRoute } = require("./admin/categoryRoutes")
const { faqRoute } = require("./admin/faqRoutes")
const { sliderRoute } = require("./admin/sliderRoutes")
const { subCategoryRoute } = require("./admin/subCategoryRoutes")
const { subSubCategoryRoute } = require("./admin/subSubCategoryRoutes")
const { whyChoseUsRoute } = require("./admin/whyChoseUsRoutes")
const { productRoute } = require("./admin/productRoutes")
const { testimonialRoute } = require("./admin/testimonialRoutes")
const { orderRoute } = require("./admin/orderRoutes")



let adminRoute=express.Router()

adminRoute.use("/color",colorRoute )

adminRoute.use("/material",materialRoute)

adminRoute.use("/country",countryRoute)

adminRoute.use("/category",categoryRoute)

adminRoute.use("/subCategory",subCategoryRoute)

adminRoute.use("/subSubCategory",subSubCategoryRoute)

adminRoute.use("/faq",faqRoute)

adminRoute.use("/slider",sliderRoute)

adminRoute.use("/whyChoseUs", whyChoseUsRoute)

adminRoute.use("/testimonial", testimonialRoute) 

adminRoute.use("/product", productRoute)

adminRoute.use("/order", orderRoute)



module.exports={adminRoute}