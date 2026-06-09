let express=require("express")
const { countryCreate, countryView, countryDelete, countryUpdate, countryChangeStatus, countrySingleData } = require("../../controller/admin/countryController")



let countryRoute=express.Router()



//   http://localhost:7000/admin/country/add

countryRoute.post('/add', countryCreate)

// //   http://localhost:7000/admin/country/view
countryRoute.get('/view', countryView)

countryRoute.post('/delete', countryDelete)

countryRoute.put('/update/:id', countryUpdate)

countryRoute.get('/single-data/:id',countrySingleData)

countryRoute.post('/change-status',countryChangeStatus)



module.exports={countryRoute}