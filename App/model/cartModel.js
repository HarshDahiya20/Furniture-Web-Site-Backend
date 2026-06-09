const mongoose = require('mongoose');

let cartSchema = mongoose.Schema({
    _UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    _ProductID: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
    _ProductName: { type: String },
    _ProductPrice: { type: Number },
    _Quantity: { type: Number, default: 1 },
    _ProductImage: { type: String },
    _Product_Slug: { type: String },
    _ProductAddedAt: { type: Date, default: Date.now }
   
        
});
let cartModel = mongoose.model("cart", cartSchema)
module.exports = cartModel