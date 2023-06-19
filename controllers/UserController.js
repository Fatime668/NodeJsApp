const {User} = require('../models/User')

const jwt = require('jsonwebtoken')
const { confirmCodeEmail } = require('../utils/EmailService')

const UserController = {
    confirmCode:(req,res)=>{
        User.findOne({email:req.body.email,code:req.body.code}).then(data=>{
            if (data) {
                let token = jwt.sign({email:req.body.email},'salam123',{
                    algorithm:'HS256',
                    expiresIn:'30d',
                    issuer:'iron maiden in token'
                })
                data.isConfirm = true
                data.save()
                res.json(({email:req.body.email,token}))
            }
            else{
                res.status(404).json({'msg':"Confirm code error"})
            }
        })
        .catch(err=>{
            res.status(500).send("Mongo error",err.message)
        })
    },
    auth:(req,res)=>{
        const randomCode = Math.floor(Math.random()*1000)
        User.findOne({email:req.body.email}).then(async(data)=>{
            if (data) {
                data.code = randomCode
                await data.save()

                confirmCodeEmail(req.body.email,randomCode)
                res.json({email:req.body.email,randomCode})
            }else{
                confirmCodeEmail(req.body.email,randomCode)
                const newUser = User({
                    email:req.body.email,
                    code:randomCode
                })
                newUser.save()
                res.json({email:newUser.email})
            }

        })
    }
}
module.exports = {
    UserController
}