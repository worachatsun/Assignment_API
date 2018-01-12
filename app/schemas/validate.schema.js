const Joi = require('joi')

const userSchema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(10).required().error(new Error('Username must contain 3 to 10 characters.')),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    email: Joi.string().email().required().error(new Error('Please follow email format.'))
})

const preferenceSchema = Joi.object().keys({
    language: Joi.string().required(), 
    timezone: Joi.string().required(), 
    currency: Joi.string().required(), 
    profile_visibility: Joi.string().required(), 
    message: Joi.string().required(), 
    category: Joi.string().required(),
    _id: Joi.string().required()
})

const authenticateUserSchema = Joi.alternatives().try(
  Joi.object({
    username: Joi.string().alphanum().min(2).max(30).required(),
    password: Joi.string().required()
  }),
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
)

const getDataFromId = Joi.object().keys({
    _id: Joi.string().required()
})

module.exports = {
    userSchema,
    authenticateUserSchema,
    getDataFromId,
    preferenceSchema
}