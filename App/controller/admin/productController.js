const { createSlug } = require("../../config/helper");
const categoryModel = require("../../model/categoryModel");
const colorModel = require("../../model/colorModel");
const materialModel = require("../../model/materialModel");
const productModel = require("../../model/productModel");
const subCategoryModel = require("../../model/subCategoryModel");
const subSubCategoryModel = require("../../model/subSubCategoryModel");


let productCreate = async (req, res) => {

  // console.log(req.body);
  console.log(req.files);

  let insertObj = { ...req.body }
  let { name } = req.body; //men
    let slug=createSlug(name)
  
     insertObj['slug']=slug

  if (req.files) {
    if(req.files.image){
        insertObj['image']=req.files.image[0].filename
      }
      if(req.files.gallery){
        insertObj['gallery']=  req.files.gallery.map((obj)=>obj.filename)
      }
  }
  console.log(insertObj);
  

  try {

    let { name } = req.body

    const regex = new RegExp(`^${name.trim()}$`,'i');  
    // trim spase ko hata kar check karta ha  
   //  same name rokne ka liya capital & samll ma 

    let checkproduct = await productModel.findOne({ name: regex, deleted_at: null })

    if (checkproduct) {
      let obj = {
        _status: false,
        _message: "product Name Alredy Existe..."
      }
      res.send(obj)
    }
    else {
      let product = await productModel.insertOne(insertObj)

      let obj = {
        _status: true,
        _message: "product Added",
        product
      }
      res.send(obj)
    }


  }
  catch (err) {

    let error = []
    for (let key in err.errors) {

      let obj = {}
      obj[key] = err.errors[key].message
      error.push(obj)

    }
    // console.log(error);

    let obj = {
      _status: false,
      error
    }
    res.send(obj)
  }





}

let productView=async (req,res)=>{
    let filter = {
        deleted_at:null
    }
    
    let data = await productModel
    .find(filter)
    .populate("parentCategory","name")
    .populate("subCategory","name")
    .populate("subSubCategory","name")
    .populate("color","name")
    .populate("material","name")
    
        
    let obj={
        _status:true,
        _message:"product View",
        path:process.env.PRODUCTPATH,
        data
    }
    res.send(obj)
}

let productDetails = async (req, res) => {
  let { slug } = req.params;
  let filter = {
    slug,
    deleted_at: null,
  };
  let data = await productModel.findOne(filter)
  .populate("parentCategory", "name")
  .populate("subCategory", "name")
  .populate("subSubCategory", "name")
  .populate("color", "name")
  .populate("material", "name");


  let obj = {
    _status: true,  
    _message: "Product View ",
    path:process.env.PRODUCTPATH,
    data,
    
  }
  res.send(obj);
 

}

let productDelete=(req,res)=>{
    let {ids}=req.body
        //  console.log(ids);
    
        productModel.updateMany(
            {
                _id:ids
            },
            {
                $set:{
                    deleted_at:Date.now()
                }
            }
        )
        .then((apiRes)=>{
            let obj={
                _status:true,
                _message:"product Delete"
            }
            res.send(obj)
        })
        .catch((err)=>{
            let obj={
                _status:false,
                _message:"product is not Delete"
            }
            res.send(obj)
        })
    
    
}

let productChangeStatus=async (req,res)=>{

    let {ids}=req.body;
    
        await productModel.updateMany(
            {_id:ids},
            [
                {
                    $set:{
                        status:{
                            $not: '$status'
                        }
                    }
                }
    
            ],
            {
                updatePipeline:true
            }
        )

    let obj={
        _status:true,
        _message:"product ChangeStatus"
    }
    res.send(obj)
}


let productUpdate=async (req,res)=>{

    let { id } = req.params
    let data = { ...req.body }

    let { name } = req.body

    var check = await productModel.findOne({
        name: name,
        deleted_at: null
    })


    if (req.files) {
        if (req.files.image) {
            data['image'] = req.files.image[0].filename;
        }

        if (req.files.gallery) {
            data['gallery'] = req.files.gallery.map(file => file.filename);
        }
    }


    //men
    let _slug = createSlug(name)

    data['slug'] = _slug

    console.log(data);


        try {


            let productres = await productModel.updateOne(
                { _id: id }
                ,
                {
                    $set: data
                }

            )


            let obj = {
                _status: true,
                _Message: 'Product Updated',

                productres,


            }
            res.send(obj)


        }
        catch (err) {

            console.log(err);

            let errorrs = err.errors
            let erre = []
            for (let key in errorrs) {
                let errobj = {}
                errobj[key] = errorrs[key].message
                erre.push(errobj)

            }
            let obj = {
                _status: false,
                erre
            }
            res.send(obj)

        }
    }



let singleData=async (req,res)=>{

    let {id}= req.params;
    // let single = await colorModel.findById(id)
    let single = await productModel.findOne({_id:id})
    .populate("parentCategory","name")
    .populate("subCategory","name")
    .populate("subSubCategory","name")
    .populate("color","name")
    .populate("material","name")

    res.status(200).json({
        _status : true,
        _massage : "Single Data",
        _path : process.env.PRODUCTPATH,
        _data : single
    })

}

let getParentCategory=async (req,res)=>{           // parent category ka data drop down ma show
      let filter = {
        deleted_at:null,
        status:true
    }
    
    let data = await categoryModel.find(filter).select("name")
    
        
    let obj={
        _status:true,
        _message:"get ParentCategory name",
        data
    }
    res.send(obj)
}

let getSubCategory=async (req,res)=>{      
    let {id}=req.params     // Sub category ka data drop down ma show
      let filter = {
        parentCategory:id,
        deleted_at:null,
        status:true
    }
    
    let data = await subCategoryModel.find(filter).select("name")
    
        
    let obj={
        _status:true,
        _message:"get SubCategory name",
        data
    }
    res.send(obj)
}

let getSubSubCategory=async (req,res)=>{      
    let {id}=req.params     // Sub category ka data drop down ma show
      let filter = {
        subCategory:id,
        deleted_at:null,
        status:true
    }
    
    let data = await subSubCategoryModel.find(filter).select("name")
    
        
    let obj={
        _status:true,
        _message:"get subSubCategory name",
        data
    }
    res.send(obj)
}

let getColor=async (req,res)=>{           // parent category ka data drop down ma show
      let filter = {
        deleted_at:null,
        status:true
    }
    
    let data = await colorModel.find(filter).select("name")
    
        
    let obj={
        _status:true,
        _message:"get Color name",
        data
    }
    res.send(obj)
  }

let getMaterial=async (req,res)=>{           // parent category ka data drop down ma show
      let filter = {
        deleted_at:null,
        status:true
    }
    
    let data = await materialModel.find(filter).select("name")
    
        
    let obj={
        _status:true,
        _message:"get material name",
        data
    }
    res.send(obj)
  }

module.exports = { 
  productCreate,
  productView,
  productDetails,
  productChangeStatus,
  productDelete,
  productUpdate,
  singleData,
  getParentCategory,
  getSubCategory,
  getSubSubCategory,
  getColor,
  getMaterial }