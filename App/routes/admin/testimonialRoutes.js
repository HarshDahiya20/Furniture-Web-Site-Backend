
let express=require("express")
let testimonialRoute=express.Router()

const { testimonialCreate, testimonialView, testimonialDelete, testimonialUpdate, singleData, testimonialChangeStatus } = require("../../controller/admin/testimonialController")

const multer  = require('multer')
const { fileUplaod } = require("../../middleware/fileUpload")




// const upload = multer({ dest: 'uploads/whyChoseUs' })  // Half Contrl multer

const storage = fileUplaod("testimonial")

const upload = multer({ storage: storage })            //  Full Control




testimonialRoute.post('/add', upload.single('image') , testimonialCreate)

testimonialRoute.get('/view',testimonialView)

testimonialRoute.post('/delete',  testimonialDelete)

testimonialRoute.put('/update/:id', upload.single('image') , testimonialUpdate)

testimonialRoute.get('/single-data/:id',singleData)

testimonialRoute.post('/change-status',testimonialChangeStatus)


module.exports={testimonialRoute}