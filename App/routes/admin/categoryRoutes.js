
let express=require("express")
let categoryRoute=express.Router()
const { categoryCreate, categoryView, categoryDelete, categoryUpdate, singleData, categoryChangeStatus } = require("../../controller/admin/categoryController")

const multer  = require('multer')
// const upload = multer({ dest: 'uploads/category' })  // Half Contrl multer

const storage = multer.diskStorage({             
  destination: function (req, file, cb) {
    cb(null, 'uploads/category')
  },
  filename: function (req, file, cb) {
    
    cb(null, Date.now()+file.originalname)
  }
})

const upload = multer({ storage: storage })            //  Full Control




categoryRoute.post('/add', upload.single('image') , categoryCreate)

categoryRoute.get('/view',categoryView)

categoryRoute.post('/delete', categoryDelete)

categoryRoute.put('/update/:id' , upload.single('image') ,  categoryUpdate)

categoryRoute.get('/single-data/:id',singleData)

categoryRoute.post('/change-status',categoryChangeStatus)


module.exports={categoryRoute}