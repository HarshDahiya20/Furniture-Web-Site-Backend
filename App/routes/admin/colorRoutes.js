let express=require("express")
const {   colorCreate, colorView, colorDelete, colorUpdate, colorChangeStatus, singleData } = require("../../controller/admin/colorController")

let colorRoute=express.Router()



//   http://localhost:7000/admin-api/color/add

colorRoute.post('/add', colorCreate)

// //   http://localhost:7000/admin-api/color/view
colorRoute.get('/view', colorView)

colorRoute.post('/delete', colorDelete)

colorRoute.put('/update/:id', colorUpdate)

colorRoute.get('/single-data/:id',singleData)

colorRoute.post('/change-status',colorChangeStatus)



module.exports={colorRoute}