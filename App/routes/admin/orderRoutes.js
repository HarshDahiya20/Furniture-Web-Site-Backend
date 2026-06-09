let express = require("express");
const { orderView, orderUpdateStatus, orderDelete } = require("../../controller/admin/orderController");

let orderRoute = express.Router();

orderRoute.get('/view', orderView);
orderRoute.put('/update-status/:id', orderUpdateStatus);
orderRoute.post('/delete', orderDelete);

module.exports = { orderRoute };
