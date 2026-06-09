const whyChoseUsModel = require("../../model/whyChoseUsModel")




let whyChoseUsCreate = async (req, res) => {

  // console.log(req.body);
  // console.log(req.file);

  let insertObj = { ...req.body }

  if (req.file) {
    if (req.file.filename) {

      insertObj['image'] = req.file.filename

    }
  }


  try {

    let { title } = req.body

    const regex = new RegExp(`^${title.trim()}$`,'i');  
    // trim spase ko hata kar check karta ha  
   //  same title rokne ka liya capital & samll ma 

    let checkwhyChoseUs = await whyChoseUsModel.findOne({ title: regex, deleted_at: null })

    if (checkwhyChoseUs) {
      let obj = {
        _status: false,
        _message: "whyChoseUs title Alredy Existe..."
      }
      res.send(obj)
    }
    else {
      let whyChoseUs = await whyChoseUsModel.insertOne(insertObj)

      let obj = {
        _status: true,
        _message: "whyChoseUs Added",
        whyChoseUs
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

let whyChoseUsView=async (req,res)=>{
    let filter = {
        deleted_at:null
    }
    
    let data = await whyChoseUsModel.find(filter)
    
        
    let obj={
        _status:true,
        _message:"whyChoseUs View",
        path:process.env.WHYCHOSEUS,
        data
    }
    res.send(obj)
}

let whyChoseUsDelete=(req,res)=>{
    let {ids}=req.body
        //  console.log(ids);
    
        whyChoseUsModel.updateMany(
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
                _message:"whyChoseUs Delete"
            }
            res.send(obj)
        })
        .catch((err)=>{
            let obj={
                _status:false,
                _message:"whyChoseUs is not Delete"
            }
            res.send(obj)
        })
    
    
}

let whyChoseUsChangeStatus=async (req,res)=>{

    let {ids}=req.body;
    
        await whyChoseUsModel.updateMany(
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
        _message:"whyChoseUs ChangeStatus"
    }
    res.send(obj)
}


let whyChoseUsUpdate=async (req,res)=>{

    let { id } = req.params
    let data = { ...req.body }

    let { title } = req.body

    var check = await whyChoseUsModel.findOne({
        title: title,
        deleted_at: null
    })


    if (req.file) {
        if (req.file.filename) {
            data['image'] = req.file.filename
        }
    }


    // console.log(data);


    try {


        let productres = await whyChoseUsModel.updateOne(
            { _id: id }
            ,
            {
                $set: data
            }

        )


        let obj = {
            _status: true,
            _Message: 'why Chose Us Updated',

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
    let single = await whyChoseUsModel.findOne({_id:id})

    res.status(200).json({
        _status : true,
        _massage : "Single Data",
        path:process.env.WHYCHOSEUS,
        _data : single
    })

}

module.exports = { whyChoseUsCreate,whyChoseUsView,whyChoseUsChangeStatus,whyChoseUsDelete,whyChoseUsUpdate,singleData }