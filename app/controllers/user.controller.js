const Boom = require('boom')
const User = require('mongoose').model('User')
const jwt = require('jsonwebtoken')
const env = require('dotenv').config()

exports.getUserData = async (req, h) => {
    if(req.headers.authorization){
        const authorization = req.headers.authorization

        try {
            const decoded = await jwt.verify(authorization, process.env.SECRET_KEY)
            const user = await User.findOne({ _id: decoded._id }).exec()
            const dataCreateToken = Object.assign({}, user)
            delete dataCreateToken._doc.password
            return {user: dataCreateToken._doc}
        } catch (error) {
            return Boom.proxyAuthRequired(error)
        }
    }else{
        return Boom.badRequest('Server Error or Unauthorized')
    }
}
