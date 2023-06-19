const {default:mongoose, model} = require('mongoose')

const UserSchema = new mongoose.Schema({
    email:String,
    code:String,
    isConfirm:{type:Boolean,default:false}
})

const User = new mongoose.model('User',UserSchema)

module.exports={
    User
}