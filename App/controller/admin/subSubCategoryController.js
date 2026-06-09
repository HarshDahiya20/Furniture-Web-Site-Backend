const { createSlug } = require("../../config/helper");
const categoryModel = require("../../model/categoryModel");
const subCategoryModel = require("../../model/subCategoryModel");
const subSubCategoryModel = require("../../model/subSubCategoryModel");


let subSubCategoryCreate = async (req, res) => {

  // console.log(req.body);
  // console.log(req.file);

  let insertObj = { ...req.body }
  let { name } = req.body; //men
    let slug=createSlug(name)
  
     insertObj['slug']=slug

  if (req.file) {
    if (req.file.filename) {

      insertObj['image'] = req.file.filename

    }
  }


  try {

    let { name } = req.body

    const regex = new RegExp(`^${name.trim()}$`,'i');  
    // trim spase ko hata kar check karta ha  
   //  same name rokne ka liya capital & samll ma 

    let checkSubSubCategory = await subSubCategoryModel.findOne({ name: regex, deleted_at: null })

    if (checkSubSubCategory) {
      let obj = {
        _status: false,
        _message: "subSubCategory Name Alredy Existe..."
      }
      res.send(obj)
    }
    else {
      let subSubCategory = await subSubCategoryModel.insertOne(insertObj)

      let obj = {
        _status: true,
        _message: "subSubCategory Added",
        subSubCategory
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

let subSubCategoryView=async (req,res)=>{
    let filter = {
        deleted_at:null
    }
    
    let data = await subSubCategoryModel.find(filter).populate("parentCategory","name").populate("subCategory","name")
    
        
    let obj={
        _status:true,
        _message:"subSubCategory View",
        path:process.env.SUBSUBCATEGORYPATH,
        data
    }
    res.send(obj)
}

let subSubCategoryDelete=(req,res)=>{
    let {ids}=req.body
        //  console.log(ids);
    
        subSubCategoryModel.updateMany(
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
                _message:"subSubCategory Delete"
            }
            res.send(obj)
        })
        .catch((err)=>{
            let obj={
                _status:false,
                _message:"subSubCategory is not Delete"
            }
            res.send(obj)
        })
    
    
}

let subSubCategoryChangeStatus=async (req,res)=>{

    let {ids}=req.body;
    
        await subSubCategoryModel.updateMany(
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
        _message:"subSubCategory ChangeStatus"
    }
    res.send(obj)
}


let subSubCategoryUpdate=async (req,res)=>{

    let { id } = req.params
    let data = { ...req.body }

    let { name } = req.body

    var check = await subSubCategoryModel.findOne({
        name: name,
        deleted_at: null
    })


    if (req.file) {
        if (req.file.filename) {
            data['image'] = req.file.filename
        }
    }


    //men
    let _slug = createSlug(name)

    data['slug'] = _slug

    console.log(data);


    try {


        let productres = await subSubCategoryModel.updateOne(
            { _id: id }
            ,
            {
                $set: data
            }

        )


        let obj = {
            _status: true,
            _Message: 'Sub Sub Category Updated',

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
    let single = await subSubCategoryModel.findOne({_id:id})

    res.status(200).json({
        _status : true,
        _massage : "Single Data",
        path:process.env.SUBSUBCATEGORYPATH,
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

module.exports = { subSubCategoryCreate,subSubCategoryView,subSubCategoryChangeStatus,subSubCategoryDelete,subSubCategoryUpdate,singleData,getParentCategory,getSubCategory }