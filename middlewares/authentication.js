const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config')

async function authentication(req, res, next){
    try {
        const { jwt:cookie } = req.cookies

        if(!cookie) return res.status(400).json({message : "Not authorised"})

        const payload = jwt.verify(cookie , JWT_SECRET)
        // console.log(payload)


        if(!payload) return res.status(400).json({message : "Not authorised"})

        req.authuser = payload.email

        next()
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Something went wrong...'})
    }
}

module.exports = authentication