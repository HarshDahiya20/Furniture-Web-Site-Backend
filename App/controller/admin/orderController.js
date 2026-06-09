const orderModel = require("../../model/orderModel");

let orderView = async (req, res) => {
    try {
        let data = await orderModel.find().populate("userId").sort({ createdAt: -1 });
        let obj = {
            _status: true,
            _message: "Orders list fetched",
            data
        };
        res.send(obj);
    } catch(err) {
        res.status(500).send({
            _status: false,
            _message: "Failed to fetch orders",
            error: err.message
        });
    }
};

let orderUpdateStatus = async (req, res) => {
    try {
        let { id } = req.params;
        let { orderStatus } = req.body; // pending, process, completed
        
        let updateRes = await orderModel.updateOne(
            { _id: id },
            { $set: { orderStatus } }
        );
        
        res.send({
            _status: true,
            _message: "Order Status Updated Successfully",
            updateRes
        });
    } catch(err) {
        res.status(500).send({
            _status: false,
            _message: "Failed to update order status",
            error: err.message
        });
    }
};

let orderDelete = async (req, res) => {
    try {
        let { ids } = req.body;
        await orderModel.deleteMany({ _id: { $in: ids } });
        res.send({
            _status: true,
            _message: "Orders Deleted Successfully"
        });
    } catch (err) {
        res.status(500).send({
            _status: false,
            _message: "Failed to delete orders",
            error: err.message
        });
    }
};

module.exports = { orderView, orderUpdateStatus, orderDelete };
