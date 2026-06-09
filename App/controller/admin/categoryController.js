const { createSlug } = require("../../config/helper");
const categoryModel = require("../../model/categoryModel")




let categoryCreate = async (req, res) => {

    // console.log(req.body);
    // console.log(req.file);

    let insertObj = { ...req.body }
    let { name } = req.body; //men
    let slug = createSlug(name)

    insertObj['slug'] = slug

    if (req.file) {
        if (req.file.filename) {
            insertObj['image'] = req.file.filename
        }
    }

    //   console.log(insertObj);



    try {

        let { name } = req.body

        const regex = new RegExp(`^${name.trim()}$`, 'i');
        // trim spase ko hata kar check karta ha  
        //  same name rokne ka liya capital & samll ma 

        let checkCategory = await categoryModel.findOne({ name: regex, deleted_at: null })

        if (checkCategory) {
            let obj = {
                _status: false,
                _message: "Category Name Alredy Existe..."
            }
            res.send(obj)
        }
        else {
            let category = await categoryModel.insertOne(insertObj)

            let obj = {
                _status: true,
                _message: "Category Added",
                category
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

let categoryView = async (req, res) => {
    let filter = {
        deleted_at: null
    }

    let data = await categoryModel.find(filter)


    let obj = {
        _status: true,
        _message: "category View",
        path: process.env.CATEGORYPATH,
        data
    }
    res.send(obj)
}

let categoryDelete = (req, res) => {
    let { ids } = req.body
    //  console.log(ids);

    categoryModel.updateMany(
        {
            _id: ids
        },
        {
            $set: {
                deleted_at: Date.now()
            }
        }
    )
        .then((apiRes) => {
            let obj = {
                _status: true,
                _message: "category Delete"
            }
            res.send(obj)
        })
        .catch((err) => {
            let obj = {
                _status: false,
                _message: "category is not Delete"
            }
            res.send(obj)
        })


}

let categoryChangeStatus = async (req, res) => {

    let { ids } = req.body;

    await categoryModel.updateMany(
        { _id: ids },
        [
            {
                $set: {
                    status: {
                        $not: '$status'
                    }
                }
            }

        ],
        {
            updatePipeline: true
        }
    )

    let obj = {
        _status: true,
        _message: "category ChangeStatus"
    }
    res.send(obj)
}


let categoryUpdate = async (req, res) => {

    let { id } = req.params
    let data = { ...req.body }

    let { name } = req.body

    var check = await categoryModel.findOne({
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


        let productres = await categoryModel.updateOne(
            { _id: id }
            ,
            {
                $set: data
            }

        )


        let obj = {
            _status: true,
            _Message: 'Category Updated',

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

let singleData = async (req, res) => {

    let { id } = req.params;
    // let single = await colorModel.findById(id)

    let single = await categoryModel.findOne({ _id: id })

    res.status(200).json({
        _status: true,
        _massage: "Single Data",
        path: process.env.CATEGORYPATH,
        _data: single
    })

}

module.exports = { categoryCreate, categoryView, categoryChangeStatus, categoryDelete, categoryUpdate, singleData }