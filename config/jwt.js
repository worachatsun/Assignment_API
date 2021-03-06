const env = require('dotenv').config()
const User = require('mongoose').model('User')

const validate = (decoded, request, callback) => {
    User.findById(decoded._id, (err, user) => {
        if(err) { return callback(null, false) }
        if(user) 
            return callback(null, true)
        else
            return callback(null, false)
    })
}

module.exports = server => {
    console.log('in')
    server.register(require('hapi-auth-jwt2'), err => {
        if(err) { console.log(err) }
        server.auth.strategy('jwt', 'jwt', true, {
            key: process.env.SECRET_KEY,
            validateFunc: validate,
            verifyOptions: { algorithms: [ 'HS256' ] }
        })

        server.auth.default('jwt')
    })
}