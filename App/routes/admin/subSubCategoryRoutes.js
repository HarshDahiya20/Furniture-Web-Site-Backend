
let express=require("express")
let subSubCategoryRoute=express.Router()

const { subSubCategoryCreate, subSubCategoryView, subSubCategoryDelete, subSubCategoryUpdate, subSubCategoryChangeStatus, singleData, getParentCategory,getSubCategory } = require("../../controller/admin/subSubCategoryController")

const multer  = require('multer')

// const upload = multer({ dest: 'uploads/category' })  // Half Contrl multer

const storage = multer.diskStorage({             
  destination: function (req, file, cb) {
    cb(null, 'uploads/subSubCategory')
  },
  filename: function (req, file, cb) {
    
    cb(null, Date.now()+file.originalname)
  }
})

const upload = multer({ storage: storage })            //  Full Control




subSubCategoryRoute.post('/add', upload.single('image') , subSubCategoryCreate)

subSubCategoryRoute.get('/view',subSubCategoryView)

subSubCategoryRoute.post('/delete', subSubCategoryDelete)

subSubCategoryRoute.put('/update/:id', upload.single('image') , subSubCategoryUpdate)

subSubCategoryRoute.get('/single-data/:id',singleData)

subSubCategoryRoute.post('/change-status',subSubCategoryChangeStatus)

subSubCategoryRoute.get('/parent',getParentCategory)

subSubCategoryRoute.get('/sub-parent/:id',getSubCategory)

module.exports={subSubCategoryRoute}