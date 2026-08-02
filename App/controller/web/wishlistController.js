const wishlistModel = require("../../model/wishlistModel");

let AddToWishlist = async (req, res) => {
    let { _UserId, _ProductID } = req.body;
    
    try {
        let filter = {
            _UserId: _UserId,
            _ProductID: _ProductID
        };

        let check = await wishlistModel.findOne(filter);

        if (check) {
            return res.send({
                _status: false,
                _message: "Product already in Wishlist"
            });
        } else {
            let wishlistres = await wishlistModel.insertOne({
                _UserId: _UserId,
                _ProductID: _ProductID
            });

            return res.send({
                _status: true,
                _message: "Product added to Wishlist",
                data: wishlistres
            });
        }
    } catch (error) {
        console.log(error);
        return res.send({
            _status: false,
            _message: "Server Error"
        });
    }
};

let ViewWishlist = async (req, res) => {
    try {
        let { _UserId } = req.body;

        let filter = {
            _UserId: _UserId
        };

        let wishlistres = await wishlistModel.find(filter).populate("_ProductID", " name price image slug actualPrice ");

        return res.send({
            _status: true,
            _message: "Wishlist View Success",
            _Path: process.env.PRODUCTPATH,
            data: wishlistres
        });
    } catch (error) {
        console.log(error);
        return res.send({
            _status: false,
            _message: "Server Error"
        });
    }
};

let RemoveFromWishlist = async (req, res) => {
    let { _UserId, _ProductID } = req.body;
    try {
        let check = {
            _UserId: _UserId,
            _ProductID: _ProductID
        };
        let checkres = await wishlistModel.findOne(check);

        if (checkres) {
            await wishlistModel.deleteOne({ _UserId: _UserId, _ProductID: _ProductID });
            return res.send({
                _status: true,
                _message: "Product removed from Wishlist"
            });
        } else {
            return res.send({
                _status: false,
                _message: "Product not found in Wishlist"
            });
        }
    } catch (error) {
        console.log(error);
        return res.send({
            _status: false,
            _message: "Server Error"
        });
    }
};

module.exports = { AddToWishlist, ViewWishlist, RemoveFromWishlist };
