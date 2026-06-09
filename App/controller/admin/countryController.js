const countryModel = require("../../model/countryModel")



let countryCreate=async (req,res)=>{

    // console.log(req.body)
    
        try{
    
            let {name}=req.body
    
            let checkcountry = await countryModel.findOne({name:name,deleted_at:null})
    
            if(checkcountry){
                let obj={
                    _status:false,
                    _message:"country Name Alredy Existe..."
                }
                res.send(obj)
            }
            else{
                let country = await countryModel.insertOne(req.body)
    
                let obj={
                    _status:true,
                    _message:"country Added",
                    country
                }
                res.send(obj)
            }
    
            
        }
        catch(err){
    
            let error=[]
            for(let key in err.errors){
    
                let obj={}
                obj[key]=err.errors[key].message
                error.push(obj)
        
            }
            // console.log(error);
            
            let obj={
                _status:false,
                error
            }
            res.send(obj)
        }

}

let countryView=async (req,res)=>{
    let filter = {
        deleted_at:null
    }
    
    let data = await countryModel.find(filter)
    
        
    let obj={
        _status:true,
        _message:"country View",
        data
    }
    res.send(obj)
}

let countryDelete=(req,res)=>{
    let {ids}=req.body
        //  console.log(ids);
    
        countryModel.updateMany(
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
                _message:"country Delete"
            }
            res.send(obj)
        })
        .catch((err)=>{
            let obj={
                _status:false,
                _message:"country is not Delete"
            }
            res.send(obj)
        })
    
    
}

let countryChangeStatus=async (req,res)=>{

    let {ids}=req.body;
    
        await countryModel.updateMany(
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
        _message:"country ChangeStatus"
    }
    res.send(obj)
}


let countryUpdate=async (req,res)=>{

    let {id}=req.params
    // console.log(id);
    
    let {name,order}=req.body
    let data={
        name:name,
        order:order
    }
    console.log(name,order);
    

    let updateData = await countryModel.updateOne({_id:id},{$set:data})

    let obj={
        _status:true,
        _message:"country Update"
    }
    res.send(obj)
}

let countrySingleData=async (req,res)=>{

    let {id}= req.params;
    // let single = await colorModel.findById(id)
    let single = await countryModel.findOne({_id:id})

    res.status(200).json({
        _status : true,
        _massage : "Single Data",
        _data : single
    })

}



module.exports={countryCreate,countryView,countryDelete,countryUpdate,countryChangeStatus,countrySingleData}