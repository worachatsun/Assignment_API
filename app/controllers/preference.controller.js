const Boom = require('boom')
const Preference = require('mongoose').model('Preference')
const env = require('dotenv').config()
const Joi = require('joi')
const mongoose = require('mongoose')
const validateSchema = require('../schemas/validate.schema')

exports.getPreferenceByUserID = async (req, h) => {
    try {
        const user = await Preference.findOne({ created_by: req.payload._id }).exec()
        if(user){
            return user
        }else{
            return Boom.badRequest('No preference')
        }
    } catch (error) {
        return Boom.proxyAuthRequired(error)
    }
}

exports.createPreference = async (req, h) => {
    const { language, timezone, currency, profile_visibility, message, category, _id } = req.payload 
    
    const preference = new Preference({
        language, 
        timezone, 
        currency,
        profile_visibility,
        message,
        category,
        created_by: _id
    })

    try {
        await Joi.validate({ language, timezone, currency, profile_visibility, message, category, _id }, validateSchema.preferenceSchema)
        await preference.save()
        return preference
    } catch (error) {
        return Boom.badRequest(error)
    }
}

exports.updatePreference = async (req, h) => {
    const { language, timezone, currency, profile_visibility, message, category, _id } = req.payload

    const updateData = {
        language, timezone, currency, profile_visibility, message, category
    }

    try {
        await Joi.validate({ language, timezone, currency, profile_visibility, message, category, _id }, validateSchema.preferenceSchema)
        const preference = await Preference.findOneAndUpdate({created_by: _id}, updateData, {new: true}).exec()
        return preference
    } catch (error) {
        return Boom.badRequest(error)
    }
}

exports.deletePreferenceByID = async (req, h) => {
    const { _id } = req.payload

    try {
        const preference = await Preference.remove({_id})
        return preference
    } catch (error) {
        return Boom.badRequest(error)
    }
}