const jwt = require('jsonwebtoken')

const tokenBlacklistModel = require("../models/blacklist.model")



async function authUser(req, res, next){

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message : "token not provided"
        })
    }

    const isTokenBlackListed = await tokenBlacklistModel.findOne({ token })

    if(isTokenBlackListed){
        return res.status(401).json({
            message: "token is invalid"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRETS)

        req.user = decoded 

        next()
    } catch (err) {
        return res.status(401).json({
            message:"Invalid token",
            error: err
        })
    }

}

module.exports = { authUser }