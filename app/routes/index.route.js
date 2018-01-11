const index = require('../controllers/index.controller')
const preference = require('../controllers/preference.controller')
const auth = require('../controllers/auth.controller')
const user = require('../controllers/user.controller')
const validateSchema = require('../schemas/validate.schema')

module.exports = (server) => {
    server.route([
        {
            method: 'GET',
            path: '/{name}',
            handler: index.render
        },
        {
            method: 'POST',
            path: '/auth/register',
            config: { 
                auth: false,
                validate: {
                    payload: validateSchema.userSchema
                },
                handler: auth.register
            }
        },
        {
            method: 'POST',
            path: '/auth/login',
            config: {
                auth: false,
                pre: [
                    { method: auth.verifyCredentials, assign: 'user' }
                ],
                handler: auth.login,
                validate: {
                    payload: validateSchema.authenticateUserSchema
                }
            }
        },
        {
            method: 'POST',
            path: '/api/userData',
            config: {
                handler: user.getUserData,
            }
        }
    ])

    server.route([
        {
            method: 'POST',
            path: '/api/createPreference',
            config: {
                handler: preference.createPreference,
            }
        },
        {
            method: 'POST',
            path: '/api/getPreferenceByUserID',
            config: {
                handler: preference.getPreferenceByUserID,
            }
        },
        {
            method: 'POST',
            path: '/api/updatePreference',
            config: {
                handler: preference.updatePreference,
            }
        },
        {
            method: 'POST',
            path: '/api/deletePreferenceByID',
            config: {
                handler: preference.deletePreferenceByID,
            }
        }
    ])
}