const jwt = require('jsonwebtoken')
module.exports = {
    create: (payload, options = {}) => {
        return jwt.sign(payload, 'jwt', options)
    }
}