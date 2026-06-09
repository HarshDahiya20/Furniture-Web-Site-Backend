const testimonialModel = require("../../model/testimonialModel");




let testimonialCreate = async (req, res) => {

    // console.log(req.body);
    // console.log(req.file);

    let insertObj = { ...req.body }

    if (req.file) {
        if (req.file.filename) {

            insertObj['image'] = req.file.filename

        }
    }


    try {

        let { name } = req.body

        const regex = new RegExp(`^${name.trim()}$`, 'i');
        // trim spase ko hata kar check karta ha  
        //  same name rokne ka liya capital & samll ma 

        let checkTestimonial = await testimonialModel.findOne({ name: regex, deleted_at: null })

        if (checkTestimonial) {
            let obj = {
                _status: false,
                _message: "Testimonial Name Alredy Existe..."
            }
            res.send(obj)
        }
        else {
            let testimonial = await testimonialModel.insertOne(insertObj)

            let obj = {
                _status: true,
                _message: "Testimonial Added",
                testimonial
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

let testimonialView = async (req, res) => {
    let filter = {
        deleted_at: null
    }

    let data = await testimonialModel.find(filter)


    let obj = {
        _status: true,
        _message: "Testimonial View",
        path: process.env.TESTIMONIALPATH,
        data
    }
    res.send(obj)
}

let testimonialDelete = (req, res) => {
    let { ids } = req.body
    //  console.log(ids);

    testimonialModel.updateMany(
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
                _message: "testimonial Delete"
            }
            res.send(obj)
        })
        .catch((err) => {
            let obj = {
                _status: false,
                _message: "testimonial is not Delete"
            }
            res.send(obj)
        })


}

let testimonialChangeStatus = async (req, res) => {

    let { ids } = req.body;

    await testimonialModel.updateMany(
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
        _message: "Testimonial ChangeStatus"
    }
    res.send(obj)
}


let testimonialUpdate = async (req, res) => {

    let { id } = req.params
    let data = { ...req.body }

    let { name } = req.body

    var check = await testimonialModel.findOne({
        name: name,
        deleted_at: null
    })


    if (req.file) {
        if (req.file.filename) {
            data['image'] = req.file.filename
        }
    }


    // console.log(data);


    try {


        let productres = await testimonialModel.updateOne(
            { _id: id }
            ,
            {
                $set: data
            }

        )


        let obj = {
            _status: true,
            _Message: 'Testimonial Updated',

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
    let single = await testimonialModel.findOne({ _id: id })

    res.status(200).json({
        _status: true,
        _massage: "Single Data",
        path:process.env.TESTIMONIALPATH,
        _data: single
    })

}

module.exports = { testimonialCreate, testimonialView, testimonialChangeStatus, testimonialDelete, testimonialUpdate, singleData }