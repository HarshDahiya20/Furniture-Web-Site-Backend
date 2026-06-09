let express=require("express")
const { saveOrder, verfiyPayment, orderList } = require("../../controller/web/orderController")
const { checkToken } = require("../../middleware/checkToken")
let orderRoute=express.Router()

orderRoute.post("/place-order",checkToken,saveOrder)

orderRoute.post("/verify-payment",verfiyPayment)
orderRoute.post("/get-orders",checkToken, orderList)
// orderRoute.get("/get-order/:id",)
// orderRoute.put("/update-order-status/:id",)


module.exports={orderRoute}