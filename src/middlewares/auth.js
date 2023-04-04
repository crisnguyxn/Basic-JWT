const { CustomAPIError, handleCustomErr } = require("../errors/custom-error")
const jwt = require('jsonwebtoken')
const asyncWrapper = require("./async")
require('dotenv').config()
const authorMiddleware = asyncWrapper (async(req,res,next) => {
    const authorizedCode = req.headers.authorization
    if(!authorizedCode ||!authorizedCode.startsWith('Bearer ')){
        return next(handleCustomErr('No token provided',401))
    }
    const token = authorizedCode.split(' ')[1]
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const {username} = decoded
        req.user = {username}
        next()
    } catch (error) {
        return next(handleCustomErr('Not authorized to access this route',401))
    }
})

module.exports = authorMiddleware