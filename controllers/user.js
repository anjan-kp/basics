const User = require("../models/user")
var expressJwt = require("express-jwt")
var jwt = require("jsonwebtoken")

const signup = (req, res) =>{
    const user = new User(req.body)
    user.save((err, user)=>{
        if(err){
            console.log(err)
            return res.status(400).json({
                error: "Unable to add user"
            })
        }

      return res.json({
            message:"Success",
            userid : user._id
        })
    })
}

const login = (req, res) =>{
    const {username, password} = req.body
     User.findOne({username}, (err, user)=>{
        if(err || !user){
           return res.status(400).json({
            error: "Username not found"
           })
        }
          
        if(user.password !== password){
            return res.status(400).json({
                error: "Password missmatch. Please enter right password"
               })
        }
        //create Token
         const token =  jwt.sign({_id : user._id }, process.env.SECRET)

        // Put token in cookie
        res.cookie('jwt', token, {expire : new Date() + 1})

        //send Response

        res.json({
            token,
            user : user._id
        })

     })


}


module.exports = {signup, login}

