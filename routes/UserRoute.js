const express = require('express');

const {UserController} = require('../controllers/UserController')

const userRoute = express.Router()

userRoute.post('/confirm',UserController.confirmCode)
userRoute.post('/auth',UserController.auth)

module.exports={
    userRoute
}