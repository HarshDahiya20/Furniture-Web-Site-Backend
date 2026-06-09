
let express=require("express")
let sliderRoute=express.Router()
const { sliderCreate, sliderView, sliderDelete, sliderUpdate, singleData, sliderChangeStatus } = require("../../controller/admin/sliderController")

const multer  = require('multer')
// const upload = multer({ dest: 'uploads/slider' })  // Half Contrl multer

const storage = multer.diskStorage({             
  destination: function (req, file, cb) {
    cb(null, 'uploads/slider')
  },
  filename: function (req, file, cb) {
    
    cb(null, Date.now()+file.originalname)
  }
})

const upload = multer({ storage: storage })            //  Full Control




sliderRoute.post('/add', upload.single('image') , sliderCreate)

sliderRoute.get('/view',sliderView)

sliderRoute.post('/delete', sliderDelete)

sliderRoute.put('/update/:id', upload.single('image') , sliderUpdate)

sliderRoute.get('/single-data/:id',singleData)

sliderRoute.post('/change-status',sliderChangeStatus)


module.exports={sliderRoute}