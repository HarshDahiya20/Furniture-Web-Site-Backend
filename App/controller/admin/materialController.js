const materialModel = require("../../model/materialModel")



let materialCreate=async (req,res)=>{

    // console.log(req.body)
    
        try{
    
            let {name}=req.body
    
            let checkMaterial = await materialModel.findOne({name:name,deleted_at:null})
    
            if(checkMaterial){
                let obj={
                    _status:false,
                    _message:"Material Name Alredy Existe..."
                }
                res.send(obj)
            }
            else{
                let material = await materialModel.insertOne(req.body)
    
                let obj={
                    _status:true,
                    _message:"Material Added",
                    material
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

let materialView=async (req,res)=>{
    let filter = {
        deleted_at:null
    }
    
    let data = await materialModel.find(filter)
    
        
    let obj={
        _status:true,
        _message:"material View",
        data
    }
    res.send(obj)
}

let materialDelete=(req,res)=>{
    let {ids}=req.body
        //  console.log(ids);
    
        materialModel.updateMany(
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
                _message:"material Delete"
            }
            res.send(obj)
        })
        .catch((err)=>{
            let obj={
                _status:false,
                _message:"material is not Delete"
            }
            res.send(obj)
        })
    
    
}

let materialChangeStatus=async (req,res)=>{

    let {ids}=req.body;
    
        await materialModel.updateMany(
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
        _message:"material ChangeStatus"
    }
    res.send(obj)
}


let materialUpdate=async (req,res)=>{

    let {id}=req.params
    // console.log(id);
    
    let {name,order}=req.body
    let data={
        name:name,
        order:order
    }
    console.log(name,order);
    

    let updateData = await materialModel.updateOne({_id:id},{$set:data})

    let obj={
        _status:true,
        _message:"material Update"
    }
    res.send(obj)
}

let singleData=async (req,res)=>{

    let {id}= req.params;
    // let single = await colorModel.findById(id)
    let single = await materialModel.findOne({_id:id})

    res.status(200).json({
        _status : true,
        _massage : "Single Data",
        _data : single
    })

}



module.exports={materialCreate,materialView,materialDelete,materialUpdate,materialChangeStatus,singleData}