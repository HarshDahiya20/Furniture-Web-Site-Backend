const cartModel = require("../../model/cartModel")


let AddToCartProduct = async (req, res) => {


    let { _UserId, _ProductID, _ProductPrice } = req.body
    console.log(_ProductID,_UserId);
    
    let data = { ...req.body }

    let filter = {
        _UserId: _UserId,
        _ProductID: _ProductID
        
    }


    let check = await cartModel.findOne(filter)


    if (check) {
        // await cartModel.updateOne(
        //     {

        //         _id: check._id

        //     },
        //     {
        //         $set: {
        //             _Quantity: check._Quantity + 1,

        //             _ProductPrice: check._ProductPrice + _ProductPrice
        //         }
        //     }
        // )
            let obj = {
                _status: false,
                _message: "Product Already in Cart, Quantity Updated",
            }
            res.send(obj);
    }
    else {
        let cartres = await cartModel.insertOne(data)

        let obj = {
            _status: true,
            _message: "Product Add",
            data: cartres
        }
        res.send(obj);

    }




}


let CartProduct = async (req, res) => {
    try{
        let { _UserId } = req.body

        // console.log(_UserId);
        

        let filter = {
            _UserId: _UserId
        }


        let cartres = await cartModel.find(filter).populate("_ProductID"," name price image ")


        let obj = {
            _status: true,
            _message: "Cart Product View",
            _Path: process.env.PRODUCTPATH,
            data:cartres,
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


let CartProductUpdate = async (req, res) => {

    try {
        let { _UserId, productData , newQuantity } = req.body;

        // console.log(req.body)


            let filter = {
                _UserId: _UserId,
                _ProductID: productData._id
            };

            let cartres = await cartModel.findOne(filter);

            // console.log(cartres);
            

            if (cartres) {

                // new quantity
                let newQty = newQuantity;


                await cartModel.updateOne(
                    {
                        _UserId: _UserId,
                        _ProductID: productData._id
                    },
                    {
                        $set: {
                            _Quantity: newQty,
                            // _ProductPrice: newPrice
                        }
                    }
                );
            }


        res.send({
            _status: true,
            _message: "Cart Updated Successfully"
        });

    } catch (error) {
        console.log(error);
        res.send({
            _status: false,
            _message: "Server Error"
        });
    }
};


let deleteitem = async (req, res) => {
    let { _UserId, _ProductID } = req.body

// console.log(req.body)
    try {
        let check = {
            _UserId: _UserId,
            _ProductID:_ProductID
        };
        let checkres = await cartModel.findOne(check)

        if (checkres) {
            await cartModel.deleteOne({_ProductID:_ProductID})
        }
        res.send({
            _status: true,
            _message: "Cart Item deleted Successfully"
        });


    }
    catch (error) {
        console.log(error);
        res.send({
            _status: false,
            _message: "Server Error"
        });
    }




}

let getProduct = async (req, res) => {

    let filter = {
        deleted_at: null,
        _id: req.params.id,
        status: true,
    };
    let data = await productModel.find(filter)


    let obj = {
        _status: true,
        _message: "Product View ",
        path: process.env.PRODUCTPATH,
        data,
    }
    res.send(obj);
}


module.exports = { CartProduct, AddToCartProduct, CartProductUpdate, deleteitem, getProduct }