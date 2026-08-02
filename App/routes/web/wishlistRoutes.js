let express = require("express")

const { AddToWishlist, ViewWishlist, RemoveFromWishlist } = require("../../controller/web/wishlistController")
const { checkToken } = require("../../middleware/checkToken")

let wishlistRoute = express.Router()

wishlistRoute.post('/add', checkToken, AddToWishlist)
wishlistRoute.post('/view', checkToken, ViewWishlist)
wishlistRoute.post('/remove', checkToken, RemoveFromWishlist)

module.exports = { wishlistRoute }
