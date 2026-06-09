const productModel = require("../../model/productModel");
const sliderModel = require("../../model/sliderModel");
const testimonialModel = require("../../model/testimonialModel");


let getProduct = async (req, res) => {

    let filter = {
        deleted_at: null,

        status: true,
    };
    let data = await productModel
        .find(filter)
        .populate("parentCategory", "name")
        .populate("subCategory", "name")
        .populate("subSubCategory", "name")
        .populate("color", "name")
        .populate("material", "name");

    let obj = {
        _status: true,
        _message: "Product View ",
        path: process.env.PRODUCTPATH,
        data,
    }
    res.send(obj);
}


let getProductDetail = async (req, res) => {
    let { slug } = req.params


    let filter = {
        deleted_at: null,
        slug: slug,
        status: true,
    };
    let data = await productModel
        .findOne(filter)
        .populate("parentCategory", "name")
        .populate("subCategory", "name")
        .populate("subSubCategory", "name")
        .populate("color", "name")
        .populate("material", "name");

    let obj = {
        _status: true,
        message: "Product Detail View ",
        path: process.env.PRODUCTPATH,
        data,
    }
    res.send(obj);
}

let getSlider = async (req, res) => {

    let filter = {
        deleted_at: null,
        status: true

    }
    let data = await sliderModel.find(filter)
    let obj = {
        _status: true,
        _message: 'Slider view',
        path: process.env.SLIDERPATH,
        data
    }
    res.send(obj)
}

let getTestimonial = async (req, res) => {

    let filter = {
        deleted_at: null,
        status: true
    };
    let data = await testimonialModel.find(filter);
    let obj = {
        _status: true,
        _message: 'Testimonial view',
        path: process.env.TESTIMONIALPATH,
        data
    };
    res.send(obj);
};

let getFeaturedProduct = async (req, res) => {

    let filter = {
        deleted_at: null,
        status: true,
        productType: "1"
        
    };
    let data = await productModel.find(filter);
    let obj = {
        _status: true,
        _message: 'Featured Product view',
        path: process.env.PRODUCTPATH,
        data
    };
    res.send(obj);
};

let getNewArrivalProduct = async (req, res) => {

    let filter = {
        deleted_at: null,
        status: true,
        productType: "2"
        
    };
    let data = await productModel.find(filter);
    let obj = {
        _status: true,
        _message: 'New Arrival Product view',
        path: process.env.PRODUCTPATH,
        data
    };
    res.send(obj);
};

let getOnSaleProduct = async (req, res) => {

    let filter = {
        deleted_at: null,
        status: true,
        productType: "3"
        
    };
    let data = await productModel.find(filter);
    let obj = {
        _status: true,
        _message: 'On Sale Product view',
        path: process.env.PRODUCTPATH,
        data
    };
    res.send(obj);
};

module.exports = { getProduct, getProductDetail, getSlider, getTestimonial ,getFeaturedProduct, getNewArrivalProduct, getOnSaleProduct}