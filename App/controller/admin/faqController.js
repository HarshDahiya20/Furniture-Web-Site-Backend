const faqModel = require("../../model/faqModel")



let faqCreate=async (req,res)=>{

    // console.log(req.body)
    
        try{
    
            let {question}=req.body
    
            let checkfaq = await faqModel.findOne({question:question,deleted_at:null})
    
            if(checkfaq){
                let obj={
                    _status:false,
                    _message:"faq question Alredy Existe..."
                }
                res.send(obj)
            }
            else{
                let faq = await faqModel.insertOne(req.body)
    
                let obj={
                    _status:true,
                    _message:"faq Added",
                    faq
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

let faqView=async (req,res)=>{
    let filter = {
        deleted_at:null
    }
    
    let data = await faqModel.find(filter)
    
        
    let obj={
        _status:true,
        _message:"faq View",
        data
    }
    res.send(obj)
}

let faqDelete=(req,res)=>{
    let {ids}=req.body
        //  console.log(ids);
    
        faqModel.updateMany(
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
                _message:"faq Delete"
            }
            res.send(obj)
        })
        .catch((err)=>{
            let obj={
                _status:false,
                _message:"faq is not Delete"
            }
            res.send(obj)
        })
    
    
}

let faqChangeStatus=async (req,res)=>{

    let {ids}=req.body;
    
        await faqModel.updateMany(
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
        _message:"faq ChangeStatus"
    }
    res.send(obj)
}


let faqUpdate=async (req,res)=>{

    let {id}=req.params
    // console.log(id);
    
    let {question,answer,order}=req.body
    let data={
        question:question,
        answer:answer,
        order:order
    }
    // console.log(question,answer,order);
    

    let updateData = await faqModel.updateOne({_id:id},{$set:data})

    let obj={
        _status:true,
        _message:"faq Update"
    }
    res.send(obj)
}

let singleData=async (req,res)=>{

    let {id}= req.params;
    // let single = await colorModel.findById(id)
    let single = await faqModel.findOne({_id:id})

    res.status(200).json({
        _status : true,
        _massage : "Single Data",
        _data : single
    })

}



module.exports={faqCreate,faqView,faqDelete,faqUpdate,faqChangeStatus,singleData}