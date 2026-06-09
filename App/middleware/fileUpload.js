const multer = require('multer')

let fileUplaod = (folderName) => multer.diskStorage(
    {
        destination: function (req, file, cb) {


            cb(null, "uploads/" + folderName)
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + file.originalname)
        }
    }
)
module.exports = { fileUplaod }