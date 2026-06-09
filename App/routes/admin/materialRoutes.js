let express=require("express")
const { materialCreate, materialView, materialDelete, materialUpdate, materialChangeStatus, singleData } = require("../../controller/admin/materialController")



let materialRoute=express.Router()



//   http://localhost:7000/admin/material/add

materialRoute.post('/add', materialCreate)

// //   http://localhost:7000/admin/material/view
materialRoute.get('/view', materialView)

materialRoute.post('/delete', materialDelete)

materialRoute.put('/update/:id', materialUpdate)

materialRoute.get('/single-data/:id',singleData)

materialRoute.post('/change-status',materialChangeStatus)



module.exports={materialRoute}