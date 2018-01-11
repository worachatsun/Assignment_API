const mongoose = require('mongoose')
const Schema = mongoose.Schema

let PreferenceSchema = new Schema({
    language: {type: String, required: true},
    timezone: {type: String, required: true},
    currency: {type: String, required: true},
    profile_visibility: {type: String, required: true},
    message: {type: String, required: true},
    category: {type: String, required: true},
    created_by: { type: String, required: true, index: { unique: true } },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

mongoose.model('Preference', PreferenceSchema)