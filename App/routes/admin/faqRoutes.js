let express=require("express")
const { faqCreate, faqView, faqDelete, faqUpdate, singleData, faqChangeStatus } = require("../../controller/admin/faqController")




let faqRoute=express.Router()



//   http://localhost:7000/admin/faq/add

faqRoute.post('/add', faqCreate)

// //   http://localhost:7000/admin/faq/view
faqRoute.get('/view', faqView)

faqRoute.post('/delete', faqDelete)

faqRoute.put('/update/:id', faqUpdate)

faqRoute.get('/single-data/:id',singleData)

faqRoute.post('/change-status',faqChangeStatus)



module.exports={faqRoute}