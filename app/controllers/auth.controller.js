const mongoose = require('mongoose')
const User = mongoose.model('User')
const Boom = require('boom')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const validateSchema = require('../schemas/validate.schema')
const JWT = require('jsonwebtoken')
const env = require('dotenv').config()

createJWTToken = user => {
    const { _id, username } = user

    return JWT.sign({ _id, username }, process.env.SECRET_KEY, { algorithm: 'HS256' } )
}

exports.login = (req, h) => {
    const dataCreateToken = Object.assign({}, req.pre.user)
    delete dataCreateToken._doc.password
    return { token: createJWTToken(dataCreateToken._doc), user: dataCreateToken._doc }
}

exports.register = async (req, h) => {
    const { username, password, email } = req.payload 
    
    const user = new User({
        username, 
        password, 
        email
    })

    try {
        await Joi.validate({username, password, email }, validateSchema.userSchema)
        user.password = await bcrypt.hashSync(password, 10)
        await user.save()
        const dataCreateToken = Object.assign({}, user)
        delete dataCreateToken._doc.password
        return { token: createJWTToken(dataCreateToken._doc), user: dataCreateToken._doc }
    } catch (error) {
        return Boom.badRequest(error)
    }
}

exports.verifyUniqueUser = (req, h) => {
    const { username, password, email } = req.payload 

    try {
        const user = User.findOne({
            $or: [
                { email },
                { username }
            ]
        }).exec()
        return req.payload
    } catch (error) {
        return Boom.badRequest(error)
    }
}

exports.verifyCredentials = async (req, h) => {
    const { username, email, password } = req.payload

    try {
        const user = await User.findOne({
            $or: [
                { email },
                { username }
            ]
        }).exec()
        const isValid = await bcrypt.compareSync(password, user.password)
        return user
    } catch (error) {
        return Boom.badRequest(error)
    }
}