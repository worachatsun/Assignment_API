const Hapi = require('hapi')
const server = new Hapi.Server()
const env = require('dotenv').config()

module.exports = () => {
    const server = Hapi.server({
        host: process.env.HOST || '127.0.0.1',
        port: process.env.PORT || 3000,
        routes: { cors: true }
    })
    
    require('./jwt')(server)
    require('../app/routes/index.route')(server)

    return server
}
