
const bcrypt = require('bcryptjs');
const userModel = require("../../models/userModel")
const jwt = require('jsonwebtoken');


async function userSignInController(req,res){
    try{
        const {email, password} = req.body

        if (!email) {
            return res.json({ message: 'Please provide email', error: true, success: false });
        }
        if (!password) {
            return res.json({ message: 'Please provide password', error: true, success: false });
        }


        const user = await userModel.findOne({email})
        if (!user) {
            throw new Error ("User not found")
        
        }

            const checkPassword = await bcrypt.compare(password, user.password)
                console.log("checkPassword", checkPassword)

              if (checkPassword){
                const tokenData = {
                    _id : user.id,
                    email : user.email,

                }
              const token = await  jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 }); //token will expire after 8 hours
             
              const tokenOption = {
                httpOnly : true,
                secure : true
              }
                res.cookie("token",token).json({
                    message : "Login Successfully",
                    data : tokenData,
                    success : true,
                    error : false
                })

            } else {
                throw new Error("Please check Password")
              } 


    }catch(err){
        res.json({
            message:   err.message || err,
            error: true,
            success: false,
        });
    }


} 

module.exports = userSignInController

