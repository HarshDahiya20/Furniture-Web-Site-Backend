
let express=require("express")
let productRoute=express.Router()

const multer  = require('multer')
const { productCreate, productView, productDelete, productUpdate, singleData, productChangeStatus, getParentCategory, getSubCategory, getSubSubCategory, getColor, getMaterial, productDetails } = require("../../controller/admin/productController")
const { fileUplaod } = require("../../middleware/fileUpload")


// const upload = multer({ dest: 'uploads/category' })  // Half Contrl multer

const storage = fileUplaod("product")            

const upload = multer({ storage: storage })            //  Full Control




productRoute.post(
    '/add', 
    upload.fields([
      { name:'image' ,maxCount:1 },
      { name:'gallery', maxCount:10 }
    
    ]) , productCreate)

productRoute.get('/view',productView)

productRoute.get("/view/:slug", productDetails)

productRoute.post('/delete', productDelete)

productRoute.put('/update/:id',  
   upload.fields([
    { name:'image' ,maxCount:1 },
    { name:'gallery', maxCount:10 }
   ]) ,productUpdate)

productRoute.get('/single-data/:id',singleData)

productRoute.post('/change-status',productChangeStatus)

productRoute.get('/parent',getParentCategory)

productRoute.get('/subCategory/:id',getSubCategory)

productRoute.get('/subSubCategory/:id',getSubSubCategory)

productRoute.get('/color',getColor)

productRoute.get('/material',getMaterial)

module.exports={productRoute}