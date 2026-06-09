
let express=require("express")
let whyChoseUsRoute=express.Router()
const { whyChoseUsCreate, whyChoseUsView, whyChoseUsDelete, whyChoseUsUpdate, singleData, whyChoseUsChangeStatus } = require("../../controller/admin/whyChoseUsController")

const multer  = require('multer')

// const upload = multer({ dest: 'uploads/whyChoseUs' })  // Half Contrl multer

const storage = multer.diskStorage({             
  destination: function (req, file, cb) {
    cb(null, 'uploads/whyChoseUs')
  },
  filename: function (req, file, cb) {
    
    cb(null, Date.now()+file.originalname)
  }
})

const upload = multer({ storage: storage })            //  Full Control




whyChoseUsRoute.post('/add', upload.single('image') , whyChoseUsCreate)

whyChoseUsRoute.get('/view',whyChoseUsView)

whyChoseUsRoute.post('/delete', whyChoseUsDelete)

whyChoseUsRoute.put('/update/:id', upload.single('image') , whyChoseUsUpdate)

whyChoseUsRoute.get('/single-data/:id',singleData)

whyChoseUsRoute.post('/change-status',whyChoseUsChangeStatus)


module.exports={whyChoseUsRoute}