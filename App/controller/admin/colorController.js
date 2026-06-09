const colorModel = require("../../model/colorModel")


let colorCreate=async (req,res)=>{

    // console.log(req.body)

    try{

        let {name}=req.body

        let checkColor = await colorModel.findOne({name:name,deleted_at:null})

        if(checkColor){
            let obj={
                _status:false,
                _message:"Color Name Alredy Existe..."
            }
            res.send(obj)
        }
        else{
            let color = await colorModel.insertOne(req.body)

            let obj={
                _status:true,
                _message:"Color Added",
                color
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

let colorView=async (req,res)=>{

    let filter = {
        deleted_at:null
    }

    let data = await colorModel.find(filter)

    let obj={
        _status:true,
        _message:"Color View",
        data
    }
    res.send(obj)
}

let colorDelete= (req,res)=>{
    let {ids}=req.body
    //  console.log(ids);

    colorModel.updateMany(
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
            _message:"Color Delete"
        }
        res.send(obj)
    })
    .catch((err)=>{
        let obj={
            _status:false,
            _message:"Color is not Delete"
        }
        res.send(obj)
    })


    //  USE THIS FOR PERMANENT DELETE
    
    // colorModel.deleteMany({_id:ids})

    // .then((apiRes)=>{
    //     let obj={
    //         _status:true,
    //         _message:"Color Delete"
    //     }
    //     res.send(obj)
    // })
    // .catch((err)=>{
    //     let obj={
    //         _status:false,
    //         _message:"Color is not Delete"
    //     }
    //     res.send(obj)
    // })
    
    
}

let colorChangeStatus=async (req,res)=>{

    let {ids}=req.body;

    await colorModel.updateMany(
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

    // for(let v of ids){
    //     let data = await colorModel.findOne({_id:v})
    //     let oldstatus = data.status
    //     console.log(v);
    //     await colorModel.updateOne({_id:v},{$set:{status: !oldstatus}})
        
    // }

    let obj={
        _status:true,
        _message:"Color ChangeStatus"
    }
    res.send(obj)
}

let colorUpdate=async (req,res)=>{

    let {id}=req.params
    console.log(id);
    
    let {name,code,order}=req.body
    let data={
        name:name,
        code:code,
        order:order
    }
    console.log(name,code,order);
    

    let updateData = await colorModel.updateOne({_id:id},{$set:data})

    let obj={
        _status:true,
        _message:"Color Update",
        _data:data
    }
    res.send(obj)
}

let singleData=async (req,res)=>{

    let {id}= req.params;
    // let single = await colorModel.findById(id)
    let single = await colorModel.findOne({_id:id})

    res.status(200).json({
        _status : true,
        _massage : "Single Data",
        _data : single
    })

}

module.exports={colorCreate,colorView,colorDelete,colorUpdate,colorChangeStatus,singleData}


