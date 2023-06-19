const express = require('express')

const app = express()
const {db} =  require('./config/db')
const jwt = require('jsonwebtoken');
const {userRoute} = require('./routes/UserRoute')
app.use(express.json())

db.connect()

app.use((req,res,next)=>{
    if (req.url == '/api/user/confirm' || req.url == '/api/user/auth') {
        next()
    }else{
        if (req.headers.authorization) {
            let data = req.header.authorization.split(' ')
            if(data.listen == 2 && data[0] == 'Bearer'){
                let token = data[1]
                try {
                    jwt.verify(token,'salam123')
                    next()
                } catch (error) {
                    res.status(403).json("token error")
                }
            }
        }
        else{
            res.status(403).json("token error")
        }
    }
})
app.use('/api/user',userRoute)

app.use('/',(req,res)=>{
    res.send('OK')
})


app.listen(3000,()=>{
    console.log('Server is running');
})