
let express=require("express")
let subCategoryRoute=express.Router()

const { subCategoryCreate, subCategoryView, subCategoryDelete, subCategoryUpdate, subCategoryChangeStatus, singleData, getParentCategory } = require("../../controller/admin/subCategoryController")

const multer  = require('multer')

// const upload = multer({ dest: 'uploads/category' })  // Half Contrl multer

const storage = multer.diskStorage({             
  destination: function (req, file, cb) {
    cb(null, 'uploads/subCategory')
  },
  filename: function (req, file, cb) {
    
    cb(null, Date.now()+file.originalname)
  }
})

const upload = multer({ storage: storage })            //  Full Control




subCategoryRoute.post('/add', upload.single('image') , subCategoryCreate)

subCategoryRoute.get('/view',subCategoryView)

subCategoryRoute.post('/delete', subCategoryDelete)

subCategoryRoute.put('/update/:id', upload.single('image') , subCategoryUpdate)

subCategoryRoute.get('/single-data/:id',singleData)

subCategoryRoute.post('/change-status',subCategoryChangeStatus)

subCategoryRoute.get('/parent',getParentCategory)


module.exports={subCategoryRoute}