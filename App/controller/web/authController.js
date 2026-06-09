const bcrypt = require('bcrypt');
const saltRounds = 10;
let jwt = require('jsonwebtoken');

const userModel = require('../../model/userModel');
const { transporter } = require('../../config/helper');



let CreateUser = async (req, res) => {

  // let password="harsh123"

  // const hash = bcrypt.hashSync(password, saltRounds );

  // console.log(hash);

  // if(bcrypt.compareSync(password, hash)){
  //   console.log(true);

  // }
  // else{
  //   console.log(false);

  // }

  let { name, email, phone, password } = req.body

  try {
    const hash = bcrypt.hashSync(password, saltRounds);

    let insertObj = {
      name,
      email,
      phone,
      password: hash
    }

    let user = await userModel.insertOne(insertObj)

    let obj = {
      _status: true,
      _message: "User Added",
      user
    }
    res.send(obj)

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

let Userlogin = async (req, res) => {
  let { email, password } = req.body

  let checkEmail = await userModel.findOne({ email });

  if (checkEmail) {

    let dbPassword = checkEmail.password

    if (bcrypt.compareSync(password, dbPassword)) {
      console.log(checkEmail._id);


      let token = jwt.sign({ userId: checkEmail._id }, process.env.TOKENKEY);

      let obj = {
        _status: true,
        _message: "Login Success",
        token
      }
      res.send(obj)

    }
    else {
      let obj = {
        _status: false,
        _message: "Invalid Password...",
      }
      res.send(obj)
    }

  }
  else {
    let obj = {
      _status: false,
      _message: "Email is not Existe...",
    }
    res.send(obj)
  }

}

let changePassword = async (req, res) => {
  let { oldPassword, newPassword, confirmPassword } = req.body

  // console.log(req.headers.authorization.split(" "));

  let token = req.headers.authorization.split(" ")[1]

  let decode = jwt.verify(token, process.env.TOKENKEY)

  let { userId } = decode

  let userData = await userModel.findOne({ _id: userId })

  let dbPassword = userData.password

  if (bcrypt.compareSync(oldPassword, dbPassword)) {

    if (newPassword==confirmPassword) {
      const hash = bcrypt.hashSync(newPassword, saltRounds);

      await userModel.updateOne(
        {
          _id: userId
        },
        {
          $set: {
            password: hash
          }
        }
      )

      let obj = {
        _status: true,
        _message: "Password changed successfully",
      }
      res.send(obj)
    }
    else{
      let obj = {
        _status: false,
        _message: "New Password and Confirm Password Not Match...",
      }
      res.send(obj)
    }
  }
  else {
    let obj = {
      _status: false,
      _message: "Invalid Old Password...",
    }
    res.send(obj)
  }


}

let forgotPassword = async (req, res) => {
  let { email } = req.body

  let checkEmail = await userModel.findOne({ email });

  if (checkEmail) {
    const info = await transporter.sendMail({
      from: '"Ecom App" <harshdahiya3766@gmail.com>', // sender address
      to: email, // list of recipients
      subject: "Furniture Messb|Forgot Password", // subject line
      text: "Reset Password link", // plain text body
      html: `<!DOCTYPE html>
              <html>
                <head>
                  <meta charset="UTF-8">
                  <title>Password Reset</title>
                </head>

                <body style="margin:0; padding:0; background:#f5f5f5; font-family: Georgia, serif;">

                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td align="center">

                        <!-- MAIN BOX -->
                        <table width="600" cellpadding="0" cellspacing="0" 
                          style="background:#ffffff; padding:40px; border-radius:10px; border:1px solid #eee;">

                          <!-- HEADER -->
                          <tr>
                            <td align="center">
                            
                              <p style="color:#c58a00; margin-top:5px;">
                              Password Reset
                              </p>
                              <hr style="border:none; border-top:1px solid #eee; margin:20px 0;">
                            </td>
                          </tr>

                          <!-- TITLE -->
                          <tr>
                            <td>
                              <h2 style="color:#111;">Reset Your Password</h2>
                              <p style="color:#666; font-size:15px; line-height:1.6;">
                                Forgot your password? No worries. Click the button below to set a new password for your account.
                              </p>
                            </td>
                          </tr>

                          <!-- BUTTON -->
                          <tr>
                            <td align="center" style="padding:30px 0;">
                              <a href="http://localhost:3000/reset-password/${checkEmail._id}"
                                style="background:#c58a00;
                                        color:#fff;
                                        padding:14px 35px;
                                        text-decoration:none;
                                        border-radius:25px;
                                        font-weight:bold;
                                        display:inline-block;">
                                RESET PASSWORD
                              </a>
                            </td>
                          </tr>

                          <!-- LINK -->
                          <tr>
                            <td>
                              <p style="color:#777; font-size:13px;">
                                If the button doesn’t work, copy and paste this link:
                              </p>
                              <p style="color:#c58a00; font-size:13px; word-break:break-all;">
                              http://localhost:3000/reset-password/${checkEmail._id}
                              </p>
                            </td>
                          </tr>

                          <!-- FOOTER -->
                          <tr>
                            <td style="padding-top:20px;">
                              <hr style="border:none; border-top:1px solid #eee;">
                              <p style="color:#999; font-size:12px; text-align:center;">
                                If you didn’t request a password reset, please ignore this email.
                              </p>
                            </td>
                          </tr>

                        </table>

                      </td>
                    </tr>
                  </table>

                </body>
             </html>`, // HTML body
    });

    let obj = {
      _status: true,
      _message: 'Rest Password link Send Your Registerd Email.....',

    }
    res.send(obj)
  }
  else {
    let obj = {
      _status: false,
      _message: "Email is not Existe...",
    }
    res.send(obj)
  }
}

let resetPassword=async (req,res)=>{
  let {userId}=req.params
  let {newPassword,confirmPassword}=req.body

  let checkUser=await userModel.findOne({_id:userId})

  if(!checkUser){
      let obj={
          _status:false,
          _message:"User Not Found...."
      }
      return res.send(obj)
  }
  else if(newPassword!=confirmPassword){
     let obj={
          _status:false,
          _message:"New Password and Confirm Password Not Match...."
      }
       return res.send(obj)
  }
  else{
      const hash = bcrypt.hashSync(newPassword, saltRounds);
      await userModel.updateOne(
          {
              _id:userId
          },
          {
              $set: {
                  password: hash
              }
          }
      );
      let obj={
          _status:true,
          _message:"Password Reset Successfully...."
      }
      return res.send(obj)
  }
}

let getUserData=async (req,res)=>{
  let token=req.headers.authorization.split(" ")[1]
  let decode=jwt.verify(token,process.env.TOKENKEY)
  let {userId}=decode 

  let userData = await userModel.findOne({ _id: userId })

  let obj={ 
    _status:true,
    _message:"User Data",
    userData
  }
  res.send(obj)

}  

module.exports = { CreateUser, Userlogin, changePassword, forgotPassword, resetPassword, getUserData }