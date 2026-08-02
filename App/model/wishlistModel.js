const mongoose = require('mongoose');

let wishlistSchema = mongoose.Schema({
    _UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    _ProductID: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
    _ProductAddedAt: { type: Date, default: Date.now }
});
let wishlistModel = mongoose.model("wishlist", wishlistSchema)
module.exports = wishlistModel
