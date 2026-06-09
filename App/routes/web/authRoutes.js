let express=require("express")
const { CreateUser, changePassword, Userlogin, forgotPassword, resetPassword, getUserData } = require("../../controller/web/authController")

let authRoute=express.Router()


authRoute.post("/create",CreateUser )

authRoute.post("/login",Userlogin)

authRoute.post("/change-password",changePassword)

authRoute.post("/forgot-password",forgotPassword)

authRoute.put('/reset-password/:userId',resetPassword)

authRoute.post("/get-data",getUserData)

module.exports={authRoute}  