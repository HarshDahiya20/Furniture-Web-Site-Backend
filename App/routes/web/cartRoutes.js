let express=require("express")

const multer = require("multer")

const { AddToCartProduct, CartProduct, CartProductUpdate, deleteitem, getProduct } = require("../../controller/web/cartController")

const { fileUplaod } = require("../../middleware/fileUpload")
const { checkToken } = require("../../middleware/checkToken")


const storage = fileUplaod("product")            

const upload = multer({ storage: storage })      



let cartRoute=express.Router()
cartRoute.post('/add', checkToken, AddToCartProduct)
cartRoute.post('/view', checkToken, CartProduct)
cartRoute.post('/update', checkToken, CartProductUpdate)
cartRoute.post('/remove', checkToken, deleteitem)
cartRoute.get('/product/:id', getProduct)

module.exports={cartRoute}