const orderModel = require("../../model/orderModel");
const mongoose = require("mongoose");
let crypto = require("crypto");
const Razorpay = require("razorpay");
// sir ke razorpay ki ID
var instance = new Razorpay({
  key_id: "rzp_test_WAft3lA6ly3OBc",
  key_secret: "68E17CNWY8SemCvZ6ylOkuOY",
});

let saveOrder = async (req, res) => {
  let orderData = { ...req.body };
  
  // Map the _UserId injected by checkToken middleware → userId field in orderModel
  orderData.userId = orderData._UserId;
  delete orderData._UserId;

  try {
    if (req.body.paymentMethod == 1) {
      let order = await orderModel.insertOne(orderData);

      //User userID for Clear Cart
      //   await cartModel.deleteOne({ userId: req.body.userId });

      res
        .status(200)
        .json({ _status: true, _message: "Order Placed Successfully" });
    } else if (req.body.paymentMethod == 2) {
      //Backend Order Creare
      orderData.paymentStatus = 1; //Pending
      orderData.orderStatus = "pending";

      let order = await orderModel.insertOne(orderData);
      //Razorpay Order Create

      var options = {
        amount: orderData.orderAmount * 100, // amount in the smallest currency unit
        currency: "INR",
        receipt: order._id.toString(),
      };
      let orderRes = await instance.orders.create(options);

      await orderModel.updateOne(
        { _id: order._id },
        { $set: { razorpayOrderId: orderRes.id } },
      );

      // console.log(orderRes);

      //After Razorpay Order Create return ORDER ID and other details

      res
        .status(200)
        .json({
          _status: true,
          _message: "Order Placed Successfully, Please proceed to payment",
          orderRes,
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        _status: false,
        _message: "Something went wrong",
        error: error.message,
      });
  }

};

let verfiyPayment = async (req, res) => {
  let { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
  let sign = razorpay_order_id + "|" + razorpay_payment_id;
  let expectedSign = crypto
    .createHmac("sha256", "68E17CNWY8SemCvZ6ylOkuOY")
    .update(sign.toString())
    .digest("hex");

  if (expectedSign === razorpay_signature) {
    //Payment Success
    await orderModel.updateOne(
      { razorpayOrderId: razorpay_order_id },
      {
        $set: {
          paymentStatus: "2",
          razorpayPayment: razorpay_payment_id,
          orderStatus: "process",
        },
      },
    );
    // await cartModel.deleteMany({ userId: req.body.userId });
    res
      .status(200)
      .json({ _status: true, _message: "Payment verified successfully" });
  }
};

let orderList = async (req, res) => {
    try{
        let { _UserId } = req.body

        let orderRes = await orderModel.find({ userId: new mongoose.Types.ObjectId(_UserId) }).sort({ createdAt: -1 })

        let obj = {
            _status: true,
            _message: "Order View",
            data: orderRes,
        }
        res.send(obj);

    } catch (error) {
        console.log(error);
        res.send({
            _status: false,
            _message: "Server Error"
        });
    }
    
}

module.exports = { saveOrder, verfiyPayment, orderList };