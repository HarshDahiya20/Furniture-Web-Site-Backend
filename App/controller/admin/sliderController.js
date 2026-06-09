const sliderModel = require("../../model/sliderModel")



let sliderCreate = async (req, res) => {

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
   //  same name rokne ka liya capital & samll ma 

    let checkSlider = await sliderModel.findOne({ title: regex, deleted_at: null })

    if (checkSlider) {
      let obj = {
        _status: false,
        _message: "Slider title Alredy Existe..."
      }
      res.send(obj)
    }
    else {
      let slider = await sliderModel.insertOne(insertObj)

      let obj = {
        _status: true,
        _message: "slider Added",
        slider
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

let sliderView=async (req,res)=>{
    let filter = {
        deleted_at:null
    }
    
    let data = await sliderModel.find(filter)
    
        
    let obj={
        _status:true,
        _message:"slider View",
        path:process.env.SLIDERPATH,
        data
    }
    res.send(obj)
}

let sliderDelete=(req,res)=>{
    let {ids}=req.body
        //  console.log(ids);
    
        sliderModel.updateMany(
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
                _message:"slider Delete"
            }
            res.send(obj)
        })
        .catch((err)=>{
            let obj={
                _status:false,
                _message:"slider is not Delete"
            }
            res.send(obj)
        })
    
    
}

let sliderChangeStatus=async (req,res)=>{

    let {ids}=req.body;
    
        await sliderModel.updateMany(
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
        _message:"slider ChangeStatus"
    }
    res.send(obj)
}


let sliderUpdate=async (req,res)=>{

    let { id } = req.params
    let data = { ...req.body }

    let { title } = req.body

    var check = await sliderModel.findOne({
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


        let productres = await sliderModel.updateOne(
            { _id: id }
            ,
            {
                $set: data
            }

        )


        let obj = {
            _status: true,
            _Message: 'Slider Updated',

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
    let single = await sliderModel.findOne({_id:id})

    res.status(200).json({
        _status : true,
        _massage : "Single Data",
        path:process.env.SLIDERPATH,
        _data : single
    })

}

module.exports = { sliderCreate,sliderView,sliderChangeStatus,sliderDelete,sliderUpdate,singleData }